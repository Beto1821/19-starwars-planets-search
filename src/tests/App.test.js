import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';



test('Renderização titulo: projeto star wars', () => {
  render(<App />);
  const tituloInput = screen.getByText(/projeto star wars \- tyrbe/i);
});

test('Renderização input localizador', () => {
  render(<App />);
  const inputBox = screen.getByRole('textbox');
});

test('Renderização filtros', () => {
  render(<App />);
    const columnSelector = screen.getByTestId('column-filter');
    const comparisonSelector = screen.getByTestId('comparison-filter');
    const numberFilterInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByRole('button', { name: /filtrar/i });
});

  test('Verifica se o filtro de igual a e de nome funcionam', async () => {
    render(<App />);
    const valueFilter = screen.getByTestId('value-filter');
    const btnFiltrar = screen.getByTestId('button-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const columnFilter = screen.getByTestId('column-filter')
    userEvent.click(columnFilter)
    const optionSurface = screen.getByRole('option', {name: 'surface_water'})
    userEvent.click(optionSurface)
    userEvent.click(comparisonFilter)
    const optionComparison = screen.getByRole('option', {name: 'igual a'})
    userEvent.click(optionComparison)
    userEvent.type(valueFilter, '100')
    userEvent.click(btnFiltrar)
    expect(await screen.findAllByRole('row')).toHaveLength(9)

  });

  test('Verificando se o filtro de nome está funcionando', async () => {
    render(<App />);
    expect(await screen.findAllByRole('row')).toHaveLength(11)
    
    const name = screen.getByTestId('name-filter');
    userEvent.type(name, 'Alderaan')
    expect(await screen.findAllByRole('row')).toHaveLength(2)

    userEvent.type(name, 'Hoth')
    expect(await screen.findAllByRole('row')).toHaveLength(1)
  });