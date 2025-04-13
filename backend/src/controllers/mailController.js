import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import redisClient from '../redisClient.js';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendRegistrationEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    await redisClient.setEx(email, 900, otp);  // 15 min expiration (900 secondes)

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: '🔑 DriveMeNow - Votre code de sécurité temporaire',
      html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Code de sécurité - DriveMeNow</title>
        <style>
          body {font-family: Arial, sans-serif; background-color: #fcedcc; padding: 20px; text-align: center;}
          .otp {font-size: 24px; font-weight: bold; color: #e67e22; margin: 20px;}
          .btn {padding: 10px 20px; background: #e67e22; color: white; border-radius: 4px; text-decoration:none;}
          .footer {font-size:12px; color:#888; margin-top:20px;}
        </style>
      </head>
      <body>
        <img src="https://res.cloudinary.com/dosumxjzj/image/upload/v1744160623/logo_1.png_smrbh2.png" alt="DriveMeNow" style="width:150px;margin-bottom:20px;">
        
        <h2>🔑 Votre code de sécurité temporaire</h2>
        <p>Voici votre code de sécurité pour finaliser votre inscription à <strong>DriveMeNow</strong> :</p>
        
        <div class="otp">${otp}</div>
        
        <button class="btn" onclick="navigator.clipboard.writeText('${otp}');">Copier le code</button>
        
        <p><strong>Attention :</strong> Ce code est valable uniquement pendant 15 minutes. Après ce délai, vous devrez demander un nouveau code.</p>
        
        <hr>
        
        <p class="footer">
          Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email ou contactez immédiatement le support DriveMeNow.
          <br>
          <br>
          <em>Ceci est un message automatique. Merci de ne pas y répondre directement.</em>
        </p>
      </body>
      </html>
      `,
    };

    await sgMail.send(msg);
    res.status(200).json({ message: 'Email envoyé avec succès.' });

  } catch (error) {
    console.error("Erreur d'envoi email ou Redis :", error.response?.body || error);
    res.status(500).json({ error: "Erreur d'envoi email ou Redis." });
  }
};
