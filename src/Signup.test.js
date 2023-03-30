import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from './Signup'

describe("tesing Login-Component",()=>{

test('mounts the signup component to the page', () => {
    const {container} = render(
        <MemoryRouter>
        < Signup />
        </MemoryRouter>
        )
    //console.log(container);
    expect(container).toBeInTheDocument()
});

test('check if there are 3 input fields on the signup page', () => {
    render(
        <MemoryRouter>
        < Signup />
        </MemoryRouter>
    )
    let inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toEqual(3);
})

test('check if there is 4 buttons on the sign up page', () => {
    render(
        <MemoryRouter>
        < Signup />
        </MemoryRouter>
    )
    let buttons = screen.getAllByRole('button')
    //console.log(buttons)
    expect(buttons.length).toEqual(4);
    })
});