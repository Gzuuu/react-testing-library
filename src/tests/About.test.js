import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes do about', () => {
  it('testa se a pagina contém um h2 com o texto About Pokédex', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    const aboutMessage = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutMessage).toBeInTheDocument();
  });

  it('verifica se a pagina contém 2 parágrafos com texto sobre a pokédex', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    const paragrafo1 = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const paragrafo2 = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    expect(paragrafo1).toBeInTheDocument();
    expect(paragrafo2).toBeInTheDocument();
  });

  it('verifica se a pagina contem a imagem da pokédex', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
