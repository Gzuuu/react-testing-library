import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes do componente favoritePokemon', () => {
  it('verifica se a mensagem No favorite Pokémon found é exibida quando não tem pokemon favorito', () => {
    renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favoritePokemons).toBeInTheDocument();
    userEvent.click(favoritePokemons);

    const errorMessage = screen.getByText(/no favorite pokémon found/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('testa se é exibido o pokemon favorito', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favoritePokemons).toBeInTheDocument();
    userEvent.click(favoritePokemons);

    const det = screen.getByRole('link', { name: /more details/i });
    expect(det).toBeInTheDocument();
  });
});
