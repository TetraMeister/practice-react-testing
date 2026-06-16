import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import { getMd5 } from '../providers/md5Provider';

import Md5Form from '../components/Md5Form';

describe('Md5Form', () => {
  it('tekst wpisany w input pojawia się w .data-text', async () => {
    const {container} = render(<Md5Form getMd5={getMd5} />);

    const input = await screen.findByRole('textbox');

    fireEvent.change(input, {target: {value: 'hello'}});

    const textValue = container.querySelector('.data-text').textContent;

    expect(textValue).toBe('hello')
  });
})