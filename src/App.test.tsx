import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import App from './App';

it('root app element not empty', () => {
  render(<App />);
  expect(screen.getByTestId('app')).not.toBeEmptyDOMElement();
});
