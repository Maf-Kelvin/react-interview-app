import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserCard from "../components/UserCard";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockUser = {
  id: 1,
  firstName: "Leanne",
  lastName: "Graham",
  username: "Bret",
  email: "leanne@example.com",
  phone: "+1-555-123-4567",
  company: { name: "Romaguera-Crona" },
};

function renderCard() {
  return render(
    <MemoryRouter>
      <UserCard user={mockUser} />
    </MemoryRouter>
  );
}

describe("UserCard", () => {
  beforeEach(() => mockNavigate.mockClear());

  it("renders user name, email, and company", () => {
    renderCard();
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.getByText("leanne@example.com")).toBeInTheDocument();
    expect(screen.getByText("Romaguera-Crona")).toBeInTheDocument();
  });

  it("navigates to detail page on click", () => {
    renderCard();
    fireEvent.click(screen.getByRole("article"));
    expect(mockNavigate).toHaveBeenCalledWith("/users/1");
  });

  it("navigates on Enter key press", () => {
    renderCard();
    fireEvent.keyDown(screen.getByRole("article"), { key: "Enter" });
    expect(mockNavigate).toHaveBeenCalledWith("/users/1");
  });
});