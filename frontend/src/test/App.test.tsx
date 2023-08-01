import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../routes/App';
import { within, waitFor } from '@testing-library/dom'
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router, Routes, Route, MemoryRouter } from 'react-router-dom'
import Login from '../routes/Login';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
  cleanup();
})
afterEach(() => {
  cleanup(); //reset JSDom
})


describe("login", () => {
  test("renders login", async () => {
    render( 
      <Login setUser={() => {}}/> 
    )
    const buttons = [
      "Login with Google",
      "Create an account",
      "Sign In"
    ]
    buttons.map(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    })
  });
  
  test("sign up modal works", async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path='' element={<Login setUser={() => {}}/>}></Route>
        </Routes>
      </MemoryRouter >
    )

    const user = userEvent.setup()
    const createAccountButton = screen.getByRole("button", {name: "Create an account"})
    // const createAccountButton = screen.getByText("Create an account")
    await user.click(createAccountButton);

    const signUpButton = screen.getByRole("button", {name: "Sign up"})
    expect(signUpButton).toBeInTheDocument();
  })

  test("sign in modal works", async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path='' element={<Login setUser={() => { }} />}></Route>
        </Routes>
      </MemoryRouter >
    )

    const user = userEvent.setup()
    const signInButton = screen.getByRole("button", { name: "Sign In" })
    // const createAccountButton = screen.getByText("Create an account")
    await user.click(signInButton);

    const logInButton = screen.getByRole("button", { name: "Log In" })
    expect(logInButton).toBeInTheDocument();
  })
})
