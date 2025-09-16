import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('Glow Grove App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Basic smoke test - just ensure the app renders
    expect(document.body).toBeDefined();
  });

  it('has basic navigation elements', () => {
    render(<App />);
    // Check for common navigation elements
    const homeLink = screen.queryByText(/home/i);
    const productsLink = screen.queryByRole('link', { name: /shop products/i });
    
    // At least one navigation element should be present
    expect(homeLink || productsLink).toBeTruthy();
  });
});


