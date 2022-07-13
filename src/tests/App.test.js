import React from 'react';
import { cleanup, render, screen, act, fireEvent } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import MockApi from './MockApi'

describe('Testes de apgina', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MockApi)
    })
    await act(async () =>{
    render(<App />)
    } )
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  }); 
   test('Testes de input, checkbox e botão', () => {
    const name = screen.getByTestId('name-filter');
    const column = screen.getByTestId('column-filter');
    const comparison =screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')
    const table = screen.getByRole('table')
    const resetGeral = screen.getByTestId('button-remove-filters')
    expect(column).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(table).toBeInTheDocument();
    expect(comparison).toBeInTheDocument()
    expect(value).toBeInTheDocument()
    expect(btnFilter).toBeInTheDocument()
    expect(resetGeral).toBeInTheDocument()

  });

  test('Testes do input com nome', async () => {
   
    const name = screen.getByTestId('name-filter');
    userEvent.type(name, 'Alderaan')
    expect(await screen.findAllByRole('row')).toHaveLength(2)

    userEvent.type(name, 'Hoth')
    expect(await screen.findAllByRole('row')).toHaveLength(1)
  });


  test('Testes filtros', async () => {
    const column = screen.getByTestId('column-filter');
    const comparison =screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')
 
    userEvent.click(column)
    userEvent.click(screen.getByRole('option', {name:'population'}))

    userEvent.click(comparison)
    userEvent.click(screen.getByRole('option', {name: 'menor que'}))

    userEvent.type(value, '1000000')
    userEvent.click(btnFilter)
    screen.queryByText(/population menor que 01000000/i)
    expect( screen.queryAllByRole('row')).toHaveLength(7)

    fireEvent.change(screen.getByTestId('comparison-filter'), {target: { value: "menor que"} });

  });
  test('Testes igual a', async () => {

    const value = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')
    
    fireEvent.change(screen.getByTestId('column-filter'), {target: { value: "rotation_period"} });

    fireEvent.change(screen.getByTestId('comparison-filter'), {target: { value: "igual a"} });

    userEvent.type(value, '12')
    userEvent.click(btnFilter);

    expect(screen.getByText(/bespin/i)).toBeInTheDocument();

  });

  test('Testes menor que', async () => {

    const column = screen.getByTestId('column-filter');
    const comparison =screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')
    
    
    fireEvent.change(screen.getByTestId('comparison-filter'), {target: { value: "menor que"} });

    userEvent.type(value, '1000000')
    userEvent.click(btnFilter);

    screen.queryByText(/population menor que 020/i)
    expect(screen.queryAllByRole('row')).toHaveLength(3)
  });

    test('Testes maior que', async () => {

    const column = screen.getByTestId('column-filter');
    const comparison =screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')
    
    userEvent.click(column)
    userEvent.click(screen.getByRole('option', {name:'population'})) 

    userEvent.click(comparison)
    userEvent.click(screen.getByRole('option', {name:'maior que'}))

    userEvent.type(value, '1000000')
    userEvent.click(btnFilter);

    expect(screen.queryAllByRole('row')).toHaveLength(7)
  });
    test('Testes maior que', async () => {

    const column = screen.getByTestId('column-filter');
    const comparison =screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')
    
    userEvent.click(column)
    userEvent.click(screen.getByRole('option', {name:'population'})) 

    userEvent.click(comparison)
    userEvent.click(screen.getByRole('option', {name:'maior que'}))

    userEvent.type(value, '1000000')
    userEvent.click(btnFilter);

    const del = screen.getByTestId('filter')
    screen.getAllByText(/remove/i)

    userEvent.click(del)
  });
    test('Testando REMOVE FILTERS', async () => {
    const column = screen.getByTestId('column-filter');
    const comparison =screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')  
    const filters =  screen.queryByTestId('button-remove-filters')

    userEvent.click(column)
    userEvent.click(screen.getByRole('option', {name:'population'})) 

    userEvent.click(comparison)
    userEvent.click(screen.getByRole('option', {name:'maior que'}))

    userEvent.type(value, '1000000')
    userEvent.click(filters);
  

    fireEvent.click(await screen.findByTestId('button-filter'));

    expect(await screen.findAllByRole('row')).toHaveLength(7);
  });

  });