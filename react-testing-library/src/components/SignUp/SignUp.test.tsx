import SignUp from "./SignUp";
import { act, screen, waitFor } from "@testing-library/react";
import render from "../../tests/render";
import userEvent from "@testing-library/user-event";
import { mockedSuccessUser, mockedUser } from "./fixtures";
import axios from "axios";

const getters = {
  getEmailInput: () => screen.getByLabelText(/^Email Address/),
  getPasswordInput: () => screen.getByLabelText(/^Password/),
  getUserNameInput: () => screen.getByLabelText(/^User Name/),
  getSignUpButton: () =>
    screen.getByRole("button", {
      name: /Sign Up/,
    }),
};

describe("components/SignUp", () => {
  /**
   * @group smoke
   */
  describe("Smoke Tests", () => {
    it("Should render SignUp Component correctly", () => {
      render(<SignUp />);
      const signUpButton = getters.getSignUpButton();
      const emailInput = getters.getEmailInput();
      const passwordInput = getters.getPasswordInput();
      const userNameInput = getters.getUserNameInput();
      expect(signUpButton).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(userNameInput).toBeInTheDocument();
    });
  });
  describe("Validations", () => {
    beforeEach(() => {
      return render(<SignUp />);
    });
    it("Should has the sign up button disabled by default", () => {
      const signUpButton = getters.getSignUpButton();
      expect(signUpButton).toBeDisabled();
    });
    it("Should show email is required when the user clears the input or leave the field empty", async () => {
      const emailInput = getters.getEmailInput();
      userEvent.type(emailInput, "test");
      userEvent.clear(emailInput);
      userEvent.click(document.body);
      const validationMessage = await screen.findByText("Email is required");
      expect(validationMessage).toBeInTheDocument();
    });
    it("Should show `Enter a valid email` when falsy email is entered", async () => {
      const emailInput = getters.getEmailInput();
      userEvent.type(emailInput, "test@");
      userEvent.click(document.body);
      const validationMessage = await screen.findByText("Enter a valid email");
      expect(validationMessage).toBeInTheDocument();
    });
  });
  describe("Basic Functionality", () => {
    it("Should submit the form with the required data", async () => {
      const handleSubmit = jest.fn();
      jest
        .spyOn(axios, "post")
        .mockImplementation((url) => Promise.resolve(mockedSuccessUser));
      render(<SignUp onSubmit={handleSubmit} />);
      const signUpButton = getters.getSignUpButton();
      const emailInput = getters.getEmailInput();
      const passwordInput = getters.getPasswordInput();
      const userNameInput = getters.getUserNameInput();
      userEvent.type(userNameInput, mockedUser.username);
      userEvent.type(emailInput, mockedUser.email);
      userEvent.type(passwordInput, mockedUser.password);
      userEvent.click(signUpButton);
      await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalledWith(mockedUser)
      );
    });
    it("Should call SingUp API upon submitting", async () => {
      const handleSubmit = jest.fn();
      render(<SignUp onSubmit={handleSubmit} />);
      const signUpAPI = jest
        .spyOn(axios, "post")
        .mockImplementation((url) => Promise.resolve(mockedSuccessUser));
      const signUpButton = getters.getSignUpButton();
      const emailInput = getters.getEmailInput();
      const passwordInput = getters.getPasswordInput();
      const userNameInput = getters.getUserNameInput();
      userEvent.type(userNameInput, mockedUser.username);
      userEvent.type(emailInput, mockedUser.email);
      userEvent.type(passwordInput, mockedUser.password);
      userEvent.click(signUpButton);
      await waitFor(() => {
        expect(signUpAPI).toBeCalled();
      });
    });
  });
});
