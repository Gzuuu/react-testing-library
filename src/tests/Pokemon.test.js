import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

const link = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';

describe('testes do componente Pokemon', () => {
  it('testa se é renderizado um card com as informações do pokemon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const pikachu = screen.getAllByText('Pikachu');
    expect(pikachu).toHaveLength(1);
    const type = screen.getByText('Electric');
    expect(type).toBeInTheDocument();
    const weight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(weight).toBeInTheDocument();
    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(img).toBeInTheDocument();
    expect(img.alt).toBe('Pikachu sprite');
    expect(img.src).toBe(link);
  });

  it('testa se o pokemon indicado contém um link com o id do pokemon, para os detalhes dele', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    const { id } = pokemonList[0];
    expect(details.href).toContain(`/pokemon/${id}`);
  });

  it('testa se ao clicar no link a página é redirecionada', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();
  });

  it('testa se ao clicar no link a URL é alterada para o endereço correto', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const { pathname } = history.location;
    const { id } = pokemonList[0];
    expect(pathname).toBe(`/pokemon/${id}`);
  });

  it('testa se existe um ícone de estrena nos pokémon favoritados', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const favoriteButton = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoriteButton);
    const star = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(star).toBeInTheDocument();
    expect(star.alt).toBe('Pikachu is marked as favorite');
    expect(star.src).toContain('/star-icon.svg');
  });
});
