import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import redisClient from '../redisClient.js';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendRegistrationEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    await redisClient.setEx(email, 900, otp); // Code valable 15 minutes (900 secondes)

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: '🔐 DriveMeNow - Votre code de sécurité',

      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <title>Code de sécurité - DriveMeNow</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #fff8eb; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05); overflow: hidden;">

            <div style="background-color: #feecc7; text-align: center; padding: 20px;">
              <img src="https://res.cloudinary.com/dosumxjzj/image/upload/v1744160623/logo_1.png_smrbh2.png" alt="DriveMeNow" style="max-height: 60px;" />
            </div>

            <div style="padding: 30px; color: #333;">
              <h2 style="color: #000; font-size: 20px; margin-bottom: 10px;">Bonjour,</h2>
              <p style="margin: 16px 0;">Nous vous adressons votre code de sécurité pour vous connecter :</p>

              <div style="background-color: #fff2db; padding: 16px; text-align: center; border-radius: 6px; margin: 24px 0;">
                <p style="font-size: 32px; font-weight: bold; color: #e67e22; margin: 0;">${otp}</p>
              </div>

              <a href="https://drivemenow.netlify.app/auth?mode=login&email=${encodeURIComponent(email)}"
                 style="display: inline-block; background-color: #ff7900; color: #fff; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 5px; margin-top: 10px;">
                Se connecter
              </a>

              <p style="margin-top: 30px; font-size: 14px; line-height: 1.5;">
                ⚠️ <strong>Attention !</strong> Ce code est valable seulement 15 minutes. Au-delà de ce délai, vous devrez demander un nouveau code.<br/>
                Ce code est strictement personnel et ne doit jamais être communiqué.<br/>
                Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.
              </p>

              <p style="margin-top: 20px; font-size: 14px;">Ce message est généré automatiquement. Merci de ne pas y répondre.</p>
              <p style="font-weight: bold;">Merci de votre confiance,<br/>L'équipe DriveMeNow 🚗</p>
            </div>

            <div style="background-color: #111; color: #fff; font-size: 11px; padding: 20px; line-height: 1.4;">
              <p>
                Merci de ne pas répondre à cet e-mail, adressé automatiquement.<br/>
                Pour vous assurer de recevoir nos emails, ajoutez l'adresse <strong>candidatlibre.assistance@gmail.com</strong> à votre carnet d’adresses.<br/>
                Pour la confidentialité et la sécurité de vos données personnelles, ne communiquez jamais vos codes confidentiels.<br/>
                DriveMeNow vous envoie uniquement des messages liés à la gestion de votre dossier, la prévention et l’amélioration de nos services.<br/>
                Pour en savoir plus, consultez nos <a href="https://drivemenow.netlify.app/cgu" style="color: #ffa500; text-decoration: underline;">conditions générales d'utilisation</a>.

                <br/><br/>
                Ce message et ses éventuelles pièces jointes peuvent contenir des informations confidentielles. 
                Si vous n'êtes pas le destinataire, merci de le supprimer immédiatement.
              </p>
            </div>

          </div>
        </body>
        </html>
      `
    };

    await sgMail.send(msg);
    res.status(200).json({ message: 'Email avec OTP envoyé.' });

  } catch (error) {
    console.error("Erreur SendGrid ou Redis :", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email ou stockage Redis." });
  }
};
