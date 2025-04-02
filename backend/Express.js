const express = require('express');
const helmet = require('helmet');
const crypto = require('crypto');

const app = express();

// Middleware pour générer un nonce unique pour chaque requête
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});

// Helmet avec CSP stricte + nonce dynamique
app.use(helmet.hsts({
  maxAge: 31536000, // 1 an (durée recommandée)
  includeSubDomains: true, // inclus sous-domaines
  preload: true // recommandé pour liste préchargée navigateur
}));

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
            "default-src": ["'self'"],
      "script-src": ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
      "style-src": ["'self'", "https://fonts.googleapis.com", (req, res) => `'nonce-${res.locals.nonce}'`],
      "font-src": ["'self'", "https://fonts.gstatic.com"],
      "img-src": ["'self'", "data:", "https:"],
      "connect-src": ["'self'"],
      "frame-src": ["'none'"],
      "frame-ancestors": ["'none'"],
      "base-uri": ["'self'"],
      "form-action": ["'self'"],
      "upgrade-insecure-requests": []
    }
  },
  crossOriginEmbedderPolicy: false
}));

module.exports = app;
