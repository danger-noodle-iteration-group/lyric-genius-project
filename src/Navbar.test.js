import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("tesing Login-Component", () => {
  test("mounts the Navbar component to the page", () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    // console.log(container);
    expect(container).toBeInTheDocument();
  });
  test("check if there are 3 links in the Navbar", () => {
   render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
    );
    const links = screen.getAllByRole('link')
    expect(links.length).toEqual(3);
  })
});
