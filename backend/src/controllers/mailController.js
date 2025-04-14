import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import redisClient from '../redisClient.js';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendRegistrationEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    await redisClient.setEx(email, 900, otp);  // 15 min valide explicitement

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: '🔐 DriveMeNow - Code de Sécurité pour Confirmation',
      html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Code Sécurité DriveMeNow</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color:#fcedcc;padding:20px;">
        <div style="text-align:center;">
          <img src="https://res.cloudinary.com/dosumxjzj/image/upload/v1744160623/logo_1.png_smrbh2.png" style="width:150px;">
          <h2>Votre code de sécurité</h2>
          <p>Utilisez ce code pour valider votre inscription sur DriveMeNow :</p>
          <p style="font-size:22px;color:#333;font-weight:bold;">${otp}</p>
          <p style="font-size:12px;color:#888;">Ce code expire dans 15 minutes.</p>
          <hr style="border:none;height:1px;background:#ddd;">
          <p style="font-size:10px;color:#aaa;">
            Si vous n'êtes pas à l'origine de cette demande, ignorez simplement ce message ou contactez le support DriveMeNow.
          </p>
          <p style="font-size:10px;color:#aaa;">
            Cet email est généré automatiquement. Merci de ne pas y répondre.
          </p>
        </div>
      </body>
      </html>
      `,
    };

    await sgMail.send(msg);
    res.status(200).json({ message: 'Email avec OTP envoyé.' });

  } catch (error) {
    console.error("Erreur SendGrid ou Redis :", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email ou stockage Redis." });
  }
};
