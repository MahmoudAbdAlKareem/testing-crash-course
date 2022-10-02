import render from "src/tests/render";
import App from "src/App";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { signUpUser } from "../../../components/SignUp/SignUp.test";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { mockedSuccessUser } from "../../../components/SignUp/fixtures";
import preview from "jest-preview";

export const handlers = [
  rest.post("*/users", (req, res, ctx) => {
    return res(ctx.json(mockedSuccessUser), ctx.delay(100));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("Sign Up Flow", () => {
  it("Should redirect the user to the checkout page after signup process is completed", async () => {
    render(<App />);
    preview.debug();
    await signUpUser();
    await waitForElementToBeRemoved(() =>
      screen.queryByRole("button", {
        name: /Sign Up/,
      })
    );
    await waitFor(() => {
      expect(screen.getByText("Checkout")).toBeInTheDocument();
    });
    // preview.debug();
  });
});
