const csp = `default-src 'self';
  script-src 'self' https://www.google.com/recaptcha/;
  style-src 'self' https://fonts.googleapis.com;
  img-src 'self' data:;
  connect-src 'self' ${import.meta.env.VITE_API_URL};`;
export default csp;