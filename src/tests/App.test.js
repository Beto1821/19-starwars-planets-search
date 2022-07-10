import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Renderização titulo: projeto star wars', () => {
  render(<App />);
  const tituloInput = screen.getByText(/projeto star wars \- tyrbe/i);
  expect(tituloInput).toBeInTheDocument();
});

test('Renderização input localizador', () => {
  render(<App />);
  const inputBox = screen.getByRole('textbox');
  expect(inputBox).toBeInTheDocument();
});