export const sendRegistrationEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    await redisClient.setEx(email, 600, otp);  

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: '🔐 Votre code de confirmation DriveMeNow',
      html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Code de confirmation - DriveMeNow</title>
      </head>
      <body style="font-family: Arial, sans-serif; background: #f7f9fc; padding: 20px; color: #333;">
        <div style="text-align:center; margin-bottom: 20px;">
          <img src="https://res.cloudinary.com/dosumxjzj/image/upload/v1744160623/logo_1.png_smrbh2.png" alt="DriveMeNow" width="120">
        </div>
        <h2 style="text-align:center; color:#0055A4;">Votre sécurité est notre priorité</h2>
        <p style="font-size:16px; text-align:center;">
          Voici votre code unique pour finaliser votre inscription :
        </p>
        <div style="text-align:center; font-size: 24px; font-weight:bold; background-color:#e9f2fe; padding:10px; border-radius:8px; width: fit-content; margin: auto;">
          ${otp}
        </div>
        <p style="text-align:center; margin-top:20px; font-size:14px;">
          Attention, ce code est valable uniquement pendant <strong>10 minutes</strong>.  
          Passé ce délai, veuillez demander un nouveau code.
        </p>
        <hr style="margin:20px;">
        <p style="font-size:12px; color:#888; text-align:center;">
          Ce code est personnel. Ne le partagez jamais. DriveMeNow ne vous demandera jamais ce code par téléphone ou email.
          <br>
          Si vous n'êtes pas à l'origine de cette demande, veuillez nous contacter immédiatement.
        </p>
        <p style="font-size:12px; text-align:center;">
          Ce message est automatique, merci de ne pas y répondre.
        </p>
        <footer style="text-align:center; font-size:12px; margin-top:20px; color:#aaa;">
          DriveMeNow - Votre partenaire mobilité<br>
          Retrouvez-nous sur <a href="https://drivemenow.netlify.app">DriveMeNow</a>
        </footer>
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
