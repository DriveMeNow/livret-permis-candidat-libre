import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

test('LoginForm affiche correctement le bouton connexion', () => {
  render(<LoginForm />);
  const button = screen.getByText(/Se connecter/i);
  expect(button).toBeInTheDocument();
});
