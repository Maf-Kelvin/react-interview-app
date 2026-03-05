# React Interview Demo App — UserHub

A React web application built as part of a technical interview task. It demonstrates functional components, React Hooks, Context API state management, REST API integration, and a clean responsive UI using Tailwind CSS.

---

## Tech Stack

| Concern            | Choice                          |
|--------------------|---------------------------------|
| Framework          | React 18 + Vite                 |
| Routing            | React Router v6                 |
| State Management   | Context API                     |
| Styling            | Tailwind CSS                    |
| API                | DummyJSON (https://dummyjson.com) |
| Testing            | Jest + React Testing Library    |

---

## Project Setup

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/react-interview-app.git

# 2. Navigate into the project folder
cd react-interview-app

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## Demo Credentials

| Field  | Value            |
|--------|------------------|
| Phone  | `+254712345678`  |

Any other number will return a "not registered" error by design.

---

## Pages

### 1. Login Page (`/login`)
- Phone number input with validation (required field, must start with `+254`)
- Mock authentication — accepts `+254712345678` as the valid credential
- Error messages for invalid input and unregistered numbers
- Redirects to Main Page on success
- Login state persisted to `localStorage`

### 2. Main Page (`/`)
- Fetches and displays a list of 20 users from DummyJSON API
- Real-time search bar filtering by name, email, username, or company
- Loading spinner and error state with retry button
- Clicking a user card navigates to the Detail Page
- Protected route — redirects to login if not authenticated

### 3. Detail Page (`/users/:id`)
- Displays full user profile: name, email, phone, address, company, age, role
- Fetches and lists all posts by the selected user
- Posts include tags
- Loading and error states handled independently for user and posts
- Back button to return to the Main Page
- Protected route — redirects to login if not authenticated

---

## Project Structure

```
src/
├── __mocks__/
│   └── styleMock.cjs           # CSS mock for Jest
├── __tests__/
│   ├── LoginPage.test.jsx       # Login page integration tests
│   ├── UserCard.test.jsx        # UserCard component tests
│   └── validators.test.js       # Validator unit tests
├── components/
│   ├── Avatar.jsx               # Initials-based avatar with color coding
│   ├── ErrorMessage.jsx         # Reusable error banner with retry
│   ├── Navbar.jsx               # Top navigation bar with logout
│   ├── ProtectedRoute.jsx       # Auth guard for private routes
│   ├── Spinner.jsx              # Accessible loading spinner
│   └── UserCard.jsx             # User list card with keyboard support
├── context/
│   └── AuthContext.jsx          # Auth state + localStorage persistence
├── pages/
│   ├── LoginPage.jsx            # Login with phone validation
│   ├── MainPage.jsx             # User list with search
│   └── DetailPage.jsx           # User profile + posts
├── services/
│   └── api.js                   # Centralised API calls
├── utils/
│   └── validators.js            # Phone validation + mock auth logic
├── index.css                    # Tailwind CSS directives
├── main.jsx                     # App entry point
└── App.jsx                      # Route definitions
```

---

## Running Tests

```bash
# Run all tests once
npm test

# Run in watch mode
npm run test:watch
```

### Test Summary

| File                    | Tests | What is covered                                              |
|-------------------------|-------|--------------------------------------------------------------|
| `validators.test.js`    | 10    | Empty input, null, wrong format, wrong country code, valid numbers, mock auth |
| `LoginPage.test.jsx`    | 6     | Render, empty submit, invalid format, unregistered number, successful login, loading state |
| `UserCard.test.jsx`     | 3     | Render, click navigation, keyboard (Enter) navigation        |
| **Total**               | **19**| **19 passing**                                               |

---

## Key Technical Decisions

- **Context API over Redux** — The app state is limited to authentication. Redux would be over-engineering for this scope.
- **Vite over CRA** — Faster dev server, leaner build output, and current industry standard.
- **DummyJSON over JSONPlaceholder** — Returns real English content for a more realistic user experience.
- **localStorage** — Login state persists across page refreshes without a backend.
- **Modular structure** — Separate folders for pages, components, services, utils, and context for maintainability and scalability.