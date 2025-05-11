// packages/frontend/src/custom.d.ts
declare module 'react-google-recaptcha' {
    import React from 'react'
    export interface ReCAPTCHAProps {
      sitekey: string
      onChange: (token: string | null) => void
      size?: 'compact' | 'normal'
      theme?: 'light' | 'dark'
      type?: 'image' | 'audio'
      tabindex?: number
      onExpired?: () => void
      onErrored?: () => void
    }
    export default class ReCAPTCHA extends React.Component<ReCAPTCHAProps> {}
  }
  
  declare module 'lucide-react' {
    export * from 'lucide-react/dist/icons'
  }
  