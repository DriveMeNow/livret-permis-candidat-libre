// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const nonce = document.querySelector('meta[property="csp-nonce"]').content;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App nonce={nonce} />
  </React.StrictMode>
)
