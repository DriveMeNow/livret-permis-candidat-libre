// src/components/ui/Button.test.jsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

test('Button renders correctly', () => {
  render(<Button>Cliquer</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Cliquer');
});
