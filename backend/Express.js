res.cookie('token', jwtToken, {
    httpOnly: true,
    secure: true,           // en HTTPS uniquement (essentiel en prod)
    sameSite: 'Strict',
    maxAge: 24 * 60 * 60 * 1000, // 24 heures
  });