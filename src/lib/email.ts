import nodemailer from 'nodemailer';

export async function sendContactEmail(
  name: string,
  email: string,
  message: string
): Promise<void> {

  // Check if SMTP is configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const contactTo = process.env.CONTACT_TO;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !contactTo) {
    console.warn('[Email] SMTP not configured. Skipping email send.');
    console.log('[Email] Would have sent:', { name, email, message, to: contactTo });
    return;
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: parseInt(smtpPort, 10) === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: contactTo,
      subject: `New Contact: ${name}`,
      html: `
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
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('[Email] Successfully sent to:', contactTo);
  } catch (error) {
    console.error('[Email] Failed to send:', error);
    // Don't throw - email failure shouldn't break the API
  }
}
