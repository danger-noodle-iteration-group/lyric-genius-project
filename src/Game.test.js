import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Game from './Game';
import Login from './Login';



describe("testing Game-Component",  () => {
  
  test('mounts the Game component to the page', () => {
   const {container} = render( 
      <MemoryRouter>
       <Game />
      </MemoryRouter>
   )
   expect(container).toBeInTheDocument();
  })

  test('tests if Game renders 3 buttons', () => {
    render( 
    <MemoryRouter>
      <Game />
    </MemoryRouter>
  );
  let buttons = screen.getAllByRole('button')
  expect(buttons.length).toEqual(4)
  })

});
