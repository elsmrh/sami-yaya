import { Resend } from 'resend';

let _resend: Resend | null = null;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key || key === 'PLACEHOLDER') return null;
  if (!_resend) {
    _resend = new Resend(key);
  }
  return _resend;
}

interface RsvpData {
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

export async function sendAdminNotification(rsvp: RsvpData): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  if (!adminEmail) {
    console.warn('⚠️  ADMIN_EMAIL not set, skipping admin notification');
    return;
  }

  const attendanceText = rsvp.attendance === 'yes' ? '✅ Oui, sera présent(e)' : '❌ Ne pourra pas venir';

  const resend = getResend();
  if (!resend) {
    console.warn('⚠️  Resend not configured, skipping admin notification');
    return;
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `💍 Nouvelle réponse RSVP — ${rsvp.name}`,
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #D4AF37; text-align: center; font-size: 28px; margin-bottom: 30px;">
            Nouvelle Réponse RSVP
          </h1>
          <div style="background: #F9F7F2; border-radius: 12px; padding: 24px; border-left: 4px solid #D4AF37;">
            <p style="font-size: 18px; margin: 0 0 16px;"><strong>Nom :</strong> ${rsvp.name}</p>
            <p style="font-size: 18px; margin: 0 0 16px;"><strong>Email :</strong> ${rsvp.email}</p>
            <p style="font-size: 18px; margin: 0 0 16px;"><strong>Présence :</strong> ${attendanceText}</p>
            ${rsvp.attendance === 'yes' ? `
              <p style="font-size: 18px; margin: 0 0 16px;"><strong>Adultes :</strong> ${rsvp.guests}</p>
              <p style="font-size: 18px; margin: 0 0 16px;"><strong>Enfants :</strong> ${rsvp.children}</p>
              ${rsvp.dietaryRestrictions ? `<p style="font-size: 18px; margin: 0 0 16px;"><strong>Régimes :</strong> ${rsvp.dietaryRestrictions}</p>` : ''}
            ` : ''}
            ${rsvp.message ? `
              <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #E6D7D5;">
                <p style="font-size: 16px; color: #666; margin: 0;"><strong>Message :</strong></p>
                <p style="font-size: 16px; font-style: italic; color: #2C3E50; margin: 8px 0 0;">"${rsvp.message}"</p>
              </div>
            ` : ''}
          </div>
          <p style="text-align: center; color: #8DA399; font-size: 14px; margin-top: 30px;">
            Réponse reçue le ${new Date(rsvp.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      `
    });
    console.log(`📧 Admin notification sent for ${rsvp.name}`);
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error);
  }
}

export async function sendGuestConfirmation(rsvp: RsvpData): Promise<void> {
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  if (!rsvp.email) return;

  const resend = getResend();
  if (!resend) {
    console.warn('⚠️  Resend not configured, skipping guest confirmation');
    return;
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: rsvp.email,
      subject: '💍 Confirmation — Mariage de Sami & Prescillia',
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #D4AF37; text-align: center; font-size: 28px; margin-bottom: 10px;">
            Sami & Prescillia
          </h1>
          <p style="text-align: center; color: #8DA399; font-size: 14px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 30px;">
            Confirmation de votre réponse
          </p>
          <div style="background: #F9F7F2; border-radius: 12px; padding: 30px; text-align: center;">
            <p style="font-size: 20px; color: #2C3E50; margin: 0 0 16px;">
              Cher(e) ${rsvp.name},
            </p>
            ${rsvp.attendance === 'yes' ? `
              <p style="font-size: 18px; color: #2C3E50; margin: 0 0 8px;">
                Merci ! Nous sommes ravis de vous compter parmi nous. 🎉
              </p>
              <p style="font-size: 16px; color: #666; margin: 0;">
                ${rsvp.guests} adulte(s)${rsvp.children > 0 ? ` et ${rsvp.children} enfant(s)` : ''} — noté !
              </p>
            ` : `
              <p style="font-size: 18px; color: #2C3E50; margin: 0;">
                Nous avons bien noté votre absence. Vous nous manquerez ! 💐
              </p>
            `}
          </div>
          <p style="text-align: center; color: #D4AF37; font-size: 16px; margin-top: 30px; font-style: italic;">
            Avec tout notre amour ❤️
          </p>
        </div>
      `
    });
    console.log(`📧 Confirmation sent to ${rsvp.email}`);
  } catch (error) {
    console.error('❌ Failed to send guest confirmation:', error);
  }
}
