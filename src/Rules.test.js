import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Rules from './Rules'


test('mounts the Rules component to the page', () => {
    const {container} = render(
        <MemoryRouter>
        < Rules />
        </MemoryRouter>
        )
    console.log(container);
    expect(container).toBeInTheDocument()
});