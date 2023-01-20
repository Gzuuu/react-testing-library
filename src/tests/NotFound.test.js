import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes do componente not found', () => {
  it('verifica se é exibida a mensagem page requested not found', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/filosofopiton');
    });

    const errorMessage = screen.getByRole('heading', { name: /page requested not found/i, level: 2 });
    expect(errorMessage).toBeInTheDocument();
  });

  it('verifica se a pagina contem a imagem do pikachu', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/filosofopiton');
    });
    const img = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
