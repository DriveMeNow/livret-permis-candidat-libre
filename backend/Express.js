const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}));

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
      "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
      "img-src": ["'self'", "data:", "https:"],
      "connect-src": ["'self'", "https://livret-numerique-permisb-candidat-libre.onrender.com"],
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
