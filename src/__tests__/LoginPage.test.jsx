import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

function renderLoginPage() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("LoginPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  it("renders the phone input and sign in button", () => {
    renderLoginPage();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows required error when submitting empty form", async () => {
    renderLoginPage();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });
    expect(await screen.findByRole("alert")).toHaveTextContent(/required/i);
  });

  it("shows format error for invalid phone number", async () => {
    renderLoginPage();
    await act(async () => {
      await userEvent.type(screen.getByLabelText(/phone number/i), "0812345678");
      fireEvent.blur(screen.getByLabelText(/phone number/i));
    });
    expect(await screen.findByRole("alert")).toHaveTextContent(/valid Irish number/i);
  });

  it("shows server error for unregistered number", async () => {
    renderLoginPage();
    await act(async () => {
      await userEvent.type(screen.getByLabelText(/phone number/i), "+353887654321");
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });
    expect(await screen.findByRole("alert")).toHaveTextContent(/not registered/i);
  });

  it("navigates to home on successful login", async () => {
    renderLoginPage();
    await act(async () => {
      await userEvent.type(screen.getByLabelText(/phone number/i), "+353812345678");
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"), {
      timeout: 2000,
    });
  });

  it("disables the button while loading", async () => {
    renderLoginPage();
    await act(async () => {
      await userEvent.type(screen.getByLabelText(/phone number/i), "+353812345678");
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });
    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();
  });
});