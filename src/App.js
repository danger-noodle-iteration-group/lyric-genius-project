import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import React from "react";
import Signup from './Signup'
import Rules from "./Rules";
import Game from "./Game";
import About from "./About";
import Login from "./Login";

const routes = createBrowserRouter([
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/play",
    element: <Game />,
  },
  {
    path: "/rules",
    element: <Rules/>
  }, {
    path: "/signup",
    element: <Signup />
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
