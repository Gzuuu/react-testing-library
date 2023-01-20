import App from "../App";
import renderWithRouter from "../renderWithRouter";
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe('teste do App', ()=> {
  it('verifica se existe os links Home, About, e Favorite Pokémon no topo da aplicação', () => {
    renderWithRouter(<App />)

    const home = screen.getByRole('link', {  name: /home/i})
    const about = screen.getByRole('link', {  name: /about/i})
    const favorite = screen.getByRole('link', {  name: /favorite pokémon/i})
    
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('verifica se é renderizado a pagina about ao clicar no link about', ()=> {
    const { history } = renderWithRouter(<App/>)
    const about = screen.getByRole('link', {  name: /about/i})
    userEvent.click(about)
    const { pathname } = history.location
    expect(pathname).toBe('/about')
  })

  it('verifica se a aplicação é redirecionada para a pagina de pokémon favoritados ao clicar em Favorite Pokémon', ()=> {
    const { history } = renderWithRouter(<App/>)
    const favorite = screen.getByRole('link', {  name: /favorite pokémon/i})
    userEvent.click(favorite)
    const { pathname } = history.location
    expect(pathname).toBe('/favorites')
  })

  it('verifica se a aplicação é redirecionada para a pagina not found quando inserida uma url desconhecida', ()=> {
    const { history } = renderWithRouter(<App/>)
    act(()=> {
      history.push('/farinhaláctea')
    })
    const errorMessage = screen.getByRole('heading', {  name: /page requested not found/i})
    expect(errorMessage).toBeInTheDocument();
  })
})
