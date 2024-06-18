import { render, screen } from '@testing-library/react';
import { it, expect, describe, beforeEach } from 'vitest';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('should contain header', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
  it('should contain main', () => {
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
  it('should contain footer', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
