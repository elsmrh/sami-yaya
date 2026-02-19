import React, { useState, useEffect, useMemo } from 'react';
import {
    Users, Baby, Heart, HeartOff, LogOut, RefreshCw, Trash2,
    Mail, Utensils, MessageSquare, TrendingUp, Calendar, Search,
    ChevronDown, ChevronUp, X
} from 'lucide-react';

interface Rsvp {
    id: string;
    name: string;
    email: string;
    attendance: string;
    guests: number;
    children: number;
    dietaryRestrictions: string;
    message: string;
    createdAt: string;
}

interface DashboardProps {
    token: string;
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ token, onLogout }) => {
    const [rsvps, setRsvps] = useState<Rsvp[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAttendance, setFilterAttendance] = useState<'all' | 'yes' | 'no'>('all');
    const [sortField, setSortField] = useState<'createdAt' | 'name'>('createdAt');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchRsvps = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/rsvps', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 401) {
                onLogout();
                return;
            }
            const data = await res.json();
            setRsvps(data);
        } catch (err) {
            setError('Erreur de connexion au serveur');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRsvps();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Supprimer cette réponse ?')) return;
        setDeletingId(id);
        try {
            await fetch(`/api/rsvps/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            setRsvps(prev => prev.filter(r => r.id !== id));
        } catch (err) {
            setError('Erreur lors de la suppression');
        } finally {
            setDeletingId(null);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch { }
        localStorage.removeItem('admin_token');
        onLogout();
    };

    // Computed stats
    const stats = useMemo(() => {
        const attending = rsvps.filter(r => r.attendance === 'yes');
        const notAttending = rsvps.filter(r => r.attendance === 'no');
        const totalAdults = attending.reduce((sum, r) => sum + r.guests, 0);
        const totalChildren = attending.reduce((sum, r) => sum + r.children, 0);
        const withDietary = attending.filter(r => r.dietaryRestrictions).length;

        return {
            total: rsvps.length,
            attending: attending.length,
            notAttending: notAttending.length,
            totalAdults,
            totalChildren,
            totalPeople: totalAdults + totalChildren,
            withDietary,
        };
    }, [rsvps]);

    // Filtered & sorted list
    const filteredRsvps = useMemo(() => {
        let filtered = [...rsvps];

        // Filter by attendance
        if (filterAttendance !== 'all') {
            filtered = filtered.filter(r => r.attendance === filterAttendance);
        }

        // Filter by search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(r =>
                r.name.toLowerCase().includes(term) ||
                r.email.toLowerCase().includes(term)
            );
        }

        // Sort
        filtered.sort((a, b) => {
            const valA = sortField === 'createdAt' ? new Date(a.createdAt).getTime() : a.name.toLowerCase();
            const valB = sortField === 'createdAt' ? new Date(b.createdAt).getTime() : b.name.toLowerCase();
            if (valA < valB) return sortDir === 'asc' ? -1 : 1;
            if (valA > valB) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [rsvps, filterAttendance, searchTerm, sortField, sortDir]);

    const toggleSort = (field: 'createdAt' | 'name') => {
        if (sortField === field) {
            setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDir('desc');
        }
    };

    const SortIcon = ({ field }: { field: 'createdAt' | 'name' }) => {
        if (sortField !== field) return null;
        return sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e]">
            {/* Header */}
            <header className="bg-black/20 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Heart className="w-6 h-6 text-wedding-gold fill-wedding-gold/30" />
                        <div>
                            <h1 className="font-script text-2xl text-white">Sami & Prescillia</h1>
                            <p className="text-white/30 text-xs font-sans tracking-wider uppercase">Dashboard RSVP</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchRsvps}
                            className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            title="Rafraîchir"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-300 rounded-lg transition-all text-sm font-sans"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Déconnexion</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-lg text-sm font-sans mb-6 flex items-center justify-between">
                        <span>{error}</span>
                        <button onClick={() => setError('')}><X className="w-4 h-4" /></button>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    <StatCard
                        icon={<TrendingUp className="w-5 h-5" />}
                        label="Réponses"
                        value={stats.total}
                        color="from-blue-500 to-blue-600"
                    />
                    <StatCard
                        icon={<Heart className="w-5 h-5" />}
                        label="Présents"
                        value={stats.attending}
                        color="from-emerald-500 to-emerald-600"
                    />
                    <StatCard
                        icon={<HeartOff className="w-5 h-5" />}
                        label="Absents"
                        value={stats.notAttending}
                        color="from-red-400 to-red-500"
                    />
                    <StatCard
                        icon={<Users className="w-5 h-5" />}
                        label="Adultes"
                        value={stats.totalAdults}
                        color="from-wedding-gold to-[#c9a030]"
                    />
                    <StatCard
                        icon={<Baby className="w-5 h-5" />}
                        label="Enfants"
                        value={stats.totalChildren}
                        color="from-purple-400 to-purple-500"
                    />
                    <StatCard
                        icon={<Utensils className="w-5 h-5" />}
                        label="Régimes"
                        value={stats.withDietary}
                        color="from-orange-400 to-orange-500"
                    />
                </div>

                {/* Total Banner */}
                <div className="bg-gradient-to-r from-wedding-gold/10 to-wedding-gold/5 border border-wedding-gold/20 rounded-xl px-6 py-4 mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-wedding-gold" />
                        <span className="font-serif text-lg text-white">
                            Total des convives : <strong className="text-wedding-gold">{stats.totalPeople}</strong> personnes
                        </span>
                    </div>
                    <span className="text-white/30 font-sans text-sm">
                        {stats.totalAdults} adultes + {stats.totalChildren} enfants
                    </span>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Rechercher par nom ou email..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-white/20 outline-none focus:border-wedding-gold/30 transition-all font-sans"
                        />
                    </div>
                    <div className="flex gap-2">
                        {(['all', 'yes', 'no'] as const).map(filter => (
                            <button
                                key={filter}
                                onClick={() => setFilterAttendance(filter)}
                                className={`px-4 py-2.5 rounded-lg text-sm font-sans transition-all ${filterAttendance === filter
                                    ? 'bg-wedding-gold text-white'
                                    : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
                                    }`}
                            >
                                {filter === 'all' ? 'Tous' : filter === 'yes' ? '✅ Présents' : '❌ Absents'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-2 border-wedding-gold/30 border-t-wedding-gold rounded-full animate-spin" />
                        </div>
                    ) : filteredRsvps.length === 0 ? (
                        <div className="text-center py-20">
                            <Users className="w-12 h-12 text-white/10 mx-auto mb-4" />
                            <p className="text-white/30 font-sans">
                                {rsvps.length === 0 ? 'Aucune réponse pour le moment' : 'Aucun résultat'}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th
                                            onClick={() => toggleSort('name')}
                                            className="text-left px-5 py-4 text-xs font-sans tracking-wider text-white/40 uppercase cursor-pointer hover:text-white/60 transition-colors"
                                        >
                                            <span className="flex items-center gap-1">Nom <SortIcon field="name" /></span>
                                        </th>
                                        <th className="text-left px-5 py-4 text-xs font-sans tracking-wider text-white/40 uppercase">Email</th>
                                        <th className="text-center px-5 py-4 text-xs font-sans tracking-wider text-white/40 uppercase">Présence</th>
                                        <th className="text-center px-5 py-4 text-xs font-sans tracking-wider text-white/40 uppercase">Adultes</th>
                                        <th className="text-center px-5 py-4 text-xs font-sans tracking-wider text-white/40 uppercase">Enfants</th>
                                        <th className="text-left px-5 py-4 text-xs font-sans tracking-wider text-white/40 uppercase">Régimes</th>
                                        <th className="text-left px-5 py-4 text-xs font-sans tracking-wider text-white/40 uppercase">Message</th>
                                        <th
                                            onClick={() => toggleSort('createdAt')}
                                            className="text-left px-5 py-4 text-xs font-sans tracking-wider text-white/40 uppercase cursor-pointer hover:text-white/60 transition-colors"
                                        >
                                            <span className="flex items-center gap-1">Date <SortIcon field="createdAt" /></span>
                                        </th>
                                        <th className="px-5 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRsvps.map((rsvp, idx) => (
                                        <tr
                                            key={rsvp.id}
                                            className={`border-b border-white/5 hover:bg-white/5 transition-colors ${idx % 2 === 0 ? 'bg-white/[0.02]' : ''
                                                }`}
                                        >
                                            <td className="px-5 py-4">
                                                <span className="font-serif text-white text-sm">{rsvp.name}</span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <a href={`mailto:${rsvp.email}`} className="text-wedding-gold/60 hover:text-wedding-gold text-sm font-sans flex items-center gap-1 transition-colors">
                                                    <Mail className="w-3 h-3" />
                                                    {rsvp.email}
                                                </a>
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-sans ${rsvp.attendance === 'yes'
                                                    ? 'bg-emerald-500/10 text-emerald-400'
                                                    : 'bg-red-500/10 text-red-400'
                                                    }`}>
                                                    {rsvp.attendance === 'yes' ? '✅ Oui' : '❌ Non'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-center font-sans text-white/70 text-sm">
                                                {rsvp.attendance === 'yes' ? rsvp.guests : '-'}
                                            </td>
                                            <td className="px-5 py-4 text-center font-sans text-white/70 text-sm">
                                                {rsvp.attendance === 'yes' ? rsvp.children : '-'}
                                            </td>
                                            <td className="px-5 py-4">
                                                {rsvp.dietaryRestrictions ? (
                                                    <span className="text-orange-300/70 text-sm font-sans flex items-center gap-1">
                                                        <Utensils className="w-3 h-3" />
                                                        {rsvp.dietaryRestrictions}
                                                    </span>
                                                ) : (
                                                    <span className="text-white/10 text-sm">—</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-4 max-w-[200px]">
                                                {rsvp.message ? (
                                                    <span className="text-white/40 text-sm font-sans italic truncate block" title={rsvp.message}>
                                                        <MessageSquare className="w-3 h-3 inline mr-1" />
                                                        {rsvp.message}
                                                    </span>
                                                ) : (
                                                    <span className="text-white/10 text-sm">—</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-4 text-white/20 text-xs font-sans whitespace-nowrap">
                                                {new Date(rsvp.createdAt).toLocaleDateString('fr-FR', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                            <td className="px-5 py-4">
                                                <button
                                                    onClick={() => handleDelete(rsvp.id)}
                                                    disabled={deletingId === rsvp.id}
                                                    className="p-1.5 text-white/10 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 className={`w-4 h-4 ${deletingId === rsvp.id ? 'animate-spin' : ''}`} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-white/10 font-sans text-xs">
                    {filteredRsvps.length} résultat{filteredRsvps.length !== 1 ? 's' : ''} sur {rsvps.length} réponse{rsvps.length !== 1 ? 's' : ''}
                </div>
            </main>
        </div>
    );
};

// Stat Card Component
const StatCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: number;
    color: string;
}> = ({ icon, label, value, color }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] transition-all group">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <p className="text-3xl font-serif text-white mb-1">{value}</p>
        <p className="text-white/30 text-xs font-sans tracking-wider uppercase">{label}</p>
    </div>
);

export default Dashboard;
