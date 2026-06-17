import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../components/Card';

describe('Card', () => {
  it('pokazuje typ karty dla poprawnego numeru Visa', async () => {
    render(<Card />);

    await userEvent.type(screen.getByRole('textbox'), '4234567890123456');
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/Visa/)).toBeInTheDocument();
    expect(screen.queryByText(/Invalid/)).not.toBeInTheDocument();
  });

  it('rozpoznaje MasterCard dla poprawnego numeru', async () => {
    render(<Card />);

    await userEvent.type(screen.getByRole('textbox'), '5134567890123454');
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/MasterCard/)).toBeInTheDocument();
  });

  it('pokazuje błąd dla niepoprawnego numeru', async () => {
    render(<Card />);

    await userEvent.type(screen.getByRole('textbox'), '4234567890123457');
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/Invalid Card number/)).toBeInTheDocument();
  });

  it('Wyświetla komunikat błędu poprawnej formy numeru bez pasującej organizacji', async () => {
    render(<Card />);

    await userEvent.type(screen.getByRole('textbox'), '9999999999999995');
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/Couldn't find matching card type/)).toBeInTheDocument();
  });

  it('czyści poprzedni wynik po wpisaniu kolejnego numeru', async () => {
    render(<Card />);
    const input = screen.getByRole('textbox');

    await userEvent.type(input, '4234567890123456');
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Visa/)).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, '4234567890123457');

    expect(screen.queryByText(/Visa/)).not.toBeInTheDocument();
  });
});