import Auth from "../components/Auth";

import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { getMd5 } from '../providers/md5Provider';

jest.spyOn(window, 'fetch');

jest.mock('../components/LoginForm', () => ({ tryAuth }) => (
    <button onClick={() => tryAuth('marcin@domena.pl', 'marcinek')}>login</button>
));

describe('Auth component', () => {
  it('powinno zwrócić tekst zalogowania jeśli poprawne dane', async () => {
    const mockedResponse = {
      Digest: 'c5450079ce3aa5440cdea45c4be193bb'
    };

    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockedResponse,
    });

    render(<Auth />)

    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByRole('heading')).toHaveTextContent('marcin@domena.pl');
  });

  it('nie loguje przy złym haśle', async () => {
    const mockedResponse = {
      Digest: '00000000000000'
    };

    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockedResponse,
    });


    render(<Auth />);
    userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  jest.clearAllMocks();
})