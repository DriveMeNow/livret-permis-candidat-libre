import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <div>Erreur inattendue. Rechargez la page.</div>;
    return this.props.children;
  }
}
