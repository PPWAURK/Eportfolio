const BREVO_API = 'https://api.brevo.com/v3/smtp/email';

export async function sendContactEmail(
  name: string,
  email: string,
  message: string
): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const contactTo = process.env.CONTACT_TO;

  if (!apiKey || !contactTo) {
    console.warn('[Email] Brevo not configured. Skipping email send.');
    console.log('[Email] Would have sent:', { name, email, message, to: contactTo });
    return;
  }

  try {
    const res = await fetch(BREVO_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { email: contactTo },
        to: [{ email: contactTo }],
        replyTo: { email, name },
        subject: `📬 Portfolio Contact: ${name}`,
        htmlContent: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #ff3b1f;">New Contact Form Submission</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #666; font-size: 12px;">
              Sent from portfolio contact form at ${new Date().toISOString()}
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Email] Brevo API error:', res.status, err);
      return;
    }

    console.log('[Email] Successfully sent via Brevo API');
  } catch (error) {
    console.error('[Email] Failed to send:', error);
  }
}
