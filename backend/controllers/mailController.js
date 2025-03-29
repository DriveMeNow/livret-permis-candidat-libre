import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import redisClient from '../redisClient.js';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendRegistrationEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    await redisClient.setEx(email, 600, otp);  // OTP expire automatiquement après 600 secondes (10 min)

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: '🚗 DriveMeNow - Votre code OTP de confirmation',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Code OTP DriveMeNow</title>
      </head>
      <body style="font-family:Arial,sans-serif;background:#fcedcc;padding:20px;text-align:center;">
        <img src="https://res.cloudinary.com/dosumxjzj/image/upload/v1743169293/mon_logo.png_tkl62a.png" alt="DriveMeNow" style="width:150px;margin-bottom:20px;">
        <h2 style="color:#333;">🚗 Bienvenue chez DriveMeNow ! 🚗</h2>
        <p style="font-size:16px;color:#555;">
          Voici votre code OTP pour valider votre inscription gratuite :
        </p>
        <p style="font-size:24px;color:#e67e22;font-weight:bold;margin:20px;" id="otp">
  ${otp}
</p>
<button onclick="navigator.clipboard.writeText('${otp}');">Copier le code</button>

        <p style="color:#555;font-size:14px;">
          Ce code est valable pendant 10 minutes.
        </p>
        <hr style="border:none;height:1px;background-color:#ddd;">
        <p style="color:#888;font-size:12px;">
          Si vous n'avez pas demandé ce code, veuillez ignorer cet email.
        </p>
      </body>
      </html>
      `,
    };

    await sgMail.send(msg);
    res.status(200).json({ message: 'Email avec OTP envoyé.' });

  } catch (error) {
    console.error("Erreur Redis ou SendGrid :", error.response?.body || error);
    res.status(500).json({ error: "Erreur d'envoi de l'email ou Redis." });
  }
};
