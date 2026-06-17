import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { getMd5 } from '../providers/md5Provider';

import Md5Form from '../components/Md5Form';

jest.spyOn(window, 'fetch');

describe('Md5Form', () => {
  it('tekst wpisany w input pojawia się w .data-text', async () => {
    const {container} = render(<Md5Form getMd5={getMd5} />);

    const input = await screen.findByRole('textbox');

    userEvent.type(input, 'hello');

    const textValue = container.querySelector('.data-text').textContent;

    expect(textValue).toBe('hello')
  });

  it('powinien załadować dane do .data-md5 po wysłaniu formularza (submit)', async () => {
    const mockedResponse = {
      Digest: '098f6bcd4621d373cade4e832627b4f6'
    };

    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockedResponse,
    });

    const { container } = render(<Md5Form getMd5={getMd5}/>);
    const input = screen.getByRole('textbox');
    const resultDisplay = container.querySelector('.data-md5');
    const submitButton = screen.getByRole('button');

    userEvent.type(input, 'test');
    userEvent.click(submitButton);

    await waitFor(() => {
        expect(resultDisplay.textContent).toBe(mockedResponse.Digest);
    });

    expect(window.fetch).toHaveBeenCalledTimes(1);
  });

  it('powinien czyścić zawartość .data-md5 po zmianie danych w input', async () => {
    const mockedResponse = {
      Digest: '098f6bcd4621d373cade4e832627b4f6'
    };

    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockedResponse,
    });

    const { container } = render(<Md5Form getMd5={getMd5}/>);
    const input = screen.getByRole('textbox');
    const resultDisplay = container.querySelector('.data-md5');
    const submitButton = screen.getByRole('button');

    userEvent.type(input, 'test');
    userEvent.click(submitButton);
    userEvent.type(input, 'change');

    expect(resultDisplay.textContent).toBe('');
  });

  jest.clearAllMocks();
})