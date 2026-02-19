import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from project root BEFORE importing email (which needs RESEND_API_KEY)
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

// Dynamic import to ensure env is loaded first
const { sendAdminNotification, sendGuestConfirmation } = await import('./email.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Data file path
const DATA_DIR = path.join(__dirname, 'data');
const RSVPS_FILE = path.join(DATA_DIR, 'rsvps.json');

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(RSVPS_FILE)) {
    fs.writeFileSync(RSVPS_FILE, '[]', 'utf-8');
}

// Helpers
function readRsvps() {
    const raw = fs.readFileSync(RSVPS_FILE, 'utf-8');
    return JSON.parse(raw);
}

function writeRsvps(data: any[]) {
    fs.writeFileSync(RSVPS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Simple token-based auth
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'mariage2026';
const tokens = new Set<string>();

function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Non autorisé' });
    }
    const token = authHeader.split(' ')[1];
    if (!tokens.has(token)) {
        return res.status(401).json({ error: 'Token invalide' });
    }
    next();
}

// Middleware
app.use(cors());
app.use(express.json());

// ============================================
// PUBLIC ROUTES
// ============================================

// Submit RSVP
app.post('/api/rsvp', async (req, res) => {
    try {
        const { name, email, attendance, guests, children, dietaryRestrictions, message } = req.body;

        if (!name || !email || !attendance) {
            return res.status(400).json({ error: 'Nom, email et présence sont requis' });
        }

        const rsvp = {
            id: randomUUID(),
            name,
            email,
            attendance,
            guests: attendance === 'yes' ? (guests || 1) : 0,
            children: attendance === 'yes' ? (children || 0) : 0,
            dietaryRestrictions: dietaryRestrictions || '',
            message: message || '',
            createdAt: new Date().toISOString()
        };

        const rsvps = readRsvps();
        rsvps.push(rsvp);
        writeRsvps(rsvps);

        console.log(`✅ RSVP enregistré: ${name} (${attendance})`);

        // Send emails (non-blocking)
        if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'PLACEHOLDER') {
            sendAdminNotification(rsvp).catch(console.error);
            sendGuestConfirmation(rsvp).catch(console.error);
        } else {
            console.log('⚠️  RESEND_API_KEY not configured, skipping emails');
        }

        res.status(201).json({ success: true, message: 'Réponse enregistrée avec succès' });
    } catch (error) {
        console.error('Error saving RSVP:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// ============================================
// AUTH ROUTES
// ============================================

app.post('/api/login', (req, res) => {
    const { password } = req.body;

    if (password === ADMIN_PASSWORD) {
        const token = randomUUID();
        tokens.add(token);
        console.log('🔐 Admin logged in');
        return res.json({ success: true, token });
    }

    res.status(401).json({ error: 'Mot de passe incorrect' });
});

app.post('/api/logout', authMiddleware, (req, res) => {
    const token = req.headers.authorization!.split(' ')[1];
    tokens.delete(token);
    res.json({ success: true });
});

// ============================================
// PROTECTED ROUTES
// ============================================

app.get('/api/rsvps', authMiddleware, (req, res) => {
    try {
        const rsvps = readRsvps();
        res.json(rsvps);
    } catch (error) {
        console.error('Error reading RSVPs:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.delete('/api/rsvps/:id', authMiddleware, (req, res) => {
    try {
        const rsvps = readRsvps();
        const filtered = rsvps.filter((r: any) => r.id !== req.params.id);
        if (filtered.length === rsvps.length) {
            return res.status(404).json({ error: 'RSVP non trouvé' });
        }
        writeRsvps(filtered);
        console.log(`🗑️  RSVP deleted: ${req.params.id}`);
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting RSVP:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// ============================================
// PRODUCTION: Serve Vite build + SPA
// ============================================

if (process.env.NODE_ENV === 'production') {
    const DIST_PATH = path.resolve(__dirname, '..', 'dist');
    app.use(express.static(DIST_PATH));
    // Catch-all: SPA index.html pour toutes les routes non-API
    app.use((_req, res) => {
        res.sendFile(path.join(DIST_PATH, 'index.html'));
    });
}

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 Admin password: ${ADMIN_PASSWORD}`);
    console.log(`📧 Resend: ${process.env.RESEND_API_KEY ? 'configured' : 'NOT configured'}`);
    console.log(`🌍 Mode: ${process.env.NODE_ENV || 'development'}`);
    console.log('');
});

