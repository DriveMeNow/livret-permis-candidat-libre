/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string
    readonly VITE_RECAPTCHA_SITE_KEY: string
    // ajoute d'autres VITE_... si besoin
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  