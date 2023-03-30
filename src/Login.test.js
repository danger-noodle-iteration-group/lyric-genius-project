
import { render, screen } from '@testing-library/react';
import Login from './Login';
import { MemoryRouter } from "react-router-dom";

describe("tesing Login-Component",()=>{
  

  test('mounts the Login component to the page', () => {
    const {container} = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });

  test('tests if 5 buttons render to Login', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    let buttons = screen.getAllByRole('button')
    expect(buttons.length).toEqual(5)
  })

  test('tests if 2 input-fields render to Login', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    let inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toEqual(2)
  })
})