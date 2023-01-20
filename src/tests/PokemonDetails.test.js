import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const link1 = 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png';
const link2 = 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png';

describe('testes do componente PokemonDetails', () => {
  it('verifica se as informações detalhadas do pokémon selecionado são mostradas', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonDetails).toBeInTheDocument();
    const detailsOff = screen.queryByRole('link', { name: /more details/i });
    expect(detailsOff).toBe(null);
    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();
    const info = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(info).toBeInTheDocument();
  });

  it('testa se existe uma seção com os mapas onde contem a localização do pokemon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const maps = screen.getByRole('heading', { name: /game locations of pikachu/i, level: 2 });
    expect(maps).toBeInTheDocument();
    const kanto = screen.getByText(/kanto viridian forest/i);
    const powerPlant = screen.getByText(/kanto power plant/i);
    expect(kanto).toBeInTheDocument();
    expect(powerPlant).toBeInTheDocument();
    const kantoImg = screen.getAllByRole('img');
    expect(kantoImg).toHaveLength(3);
    expect(kantoImg[1].alt).toBe('Pikachu location');
    expect(kantoImg[2].alt).toBe('Pikachu location');
    expect(kantoImg[1].src).toBe(link1);
    expect(kantoImg[2].src).toBe(link2);
  });

  it('verifica se o usuário pode favoritar um pokemon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const favoriteButton = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoriteButton);
    const favorites = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favorites).toBeInTheDocument();
    userEvent.click(favorites);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
