import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('testes da pokedex', () => {
  it('testa se existe um heading com o texto Encoutered Pokémon', () => {
    renderWithRouter(<App />);
    const encountered = screen.getByRole('heading', { name: /encountered pokémon/i, level: 2 });
    expect(encountered).toBeInTheDocument();
  });

  it('verifica se é exibido o proximo pokémon quando clickado o botão "Próximo pokemon"', () => {
    renderWithRouter(<App />);
    const poke = screen.getAllByTestId('pokemon-type-button');
    expect(poke).toBeDefined();
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(button);
    const poke2 = screen.getByText(/charmander/i);
    expect(poke2).toBeInTheDocument();
  });

  it('testa se a pokedex tem os botões de filtros', () => {
    renderWithRouter(<App />);
    const elements = pokemonList.reduce((types, { type }) => [...types, type], []);
    elements.forEach((element) => {
      const button = screen.getByRole('button', { name: element });
      expect(button).toBeInTheDocument();
      userEvent.click(button);
      const text = screen.getAllByText(element);
      expect(text).toHaveLength(2);
    });
  });

  it('verifica se a pokédex tem um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const reset = screen.getByRole('button', { name: /all/i });
    expect(reset).toBeInTheDocument();
    const bug = screen.getByRole('button', { name: /bug/i });
    userEvent.click(bug);
    const text = screen.getByText(/caterpie/i);
    expect(text).toBeInTheDocument();
    userEvent.click(reset);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
