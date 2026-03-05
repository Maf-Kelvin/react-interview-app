# React Interview Demo App — UserHub

A React web application built as part of a technical interview task. It demonstrates functional components, React Hooks, Context API state management, REST API integration, and a clean responsive UI using Tailwind CSS.

---

## Tech Stack

| Concern            | Choice                            |
|--------------------|-----------------------------------|
| Framework          | React 18 + Vite                   |
| Routing            | React Router v6                   |
| State Management   | Context API                       |
| Styling            | Tailwind CSS                      |
| API                | DummyJSON (https://dummyjson.com) |
| Testing            | Jest + React Testing Library      |
| Linting            | ESLint + Prettier                 |

---

## Project Setup

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Maf-Kelvin/react-interview-app.git

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

| Field  | Value             |
|--------|-------------------|
| Phone  | `+353812345678`   |

Valid format: Irish mobile number starting with `+3538` followed by 7 digits.
Any other number will return a "not registered" error by design.

---

## Pages

### 1. Login Page (`/login`)
- Phone number input with validation (required field, must be a valid Irish mobile number starting with `+3538`)
- Mock authentication — accepts `+353812345678` as the valid credential
- Error messages for invalid input and unregistered numbers
- Redirects to Main Page on success
- Login state persisted to `localStorage`
- Auto logout after 30 minutes of session inactivity

### 2. Main Page (`/`)
- Fetches and displays a list of 20 users from DummyJSON API
- Real-time search bar with debounce filtering by name, email, username, or company
- Search results announced to screen readers via `aria-live`
- Skeleton loaders while data is fetching
- Error state with retry button
- Clicking a user card navigates to the Detail Page
- Protected route — redirects to login if not authenticated

### 3. Detail Page (`/users/:id`)
- Displays full user profile: photo, name, email, phone, address, company, age, role
- Profile picture loaded from DummyJSON with initials fallback on error
- Fetches and lists all posts by the selected user with tags
- Empty state when a user has no posts
- Loading and error states handled independently for user and posts
- Back button to return to the Main Page
- Protected route — redirects to login if not authenticated

### 4. 404 Page (`*`)
- Shown for any unmatched route
- Button to navigate back to Home

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
│   ├── SkeletonCard.jsx         # Animated skeleton loader card
│   ├── Spinner.jsx              # Accessible loading spinner
│   └── UserCard.jsx             # User list card with profile picture
├── context/
│   └── AuthContext.jsx          # Auth state + localStorage + session timeout
├── pages/
│   ├── LoginPage.jsx            # Login with phone validation
│   ├── MainPage.jsx             # User list with search and skeleton loaders
│   ├── DetailPage.jsx           # User profile + posts
│   └── NotFoundPage.jsx         # 404 page
├── services/
│   └── api.js                   # Centralised API calls (DummyJSON)
├── utils/
│   └── validators.js            # Phone validation, mock auth, session utils
├── index.css                    # Tailwind CSS directives
├── main.jsx                     # App entry point
└── App.jsx                      # Route definitions
```

---

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint the codebase
npm run lint

# Format code with Prettier
npm run format
```

---

## Running Tests

```bash
npm test
```

### Test Summary

| File                    | Tests | What is covered                                                               |
|-------------------------|-------|-------------------------------------------------------------------------------|
| `validators.test.js`    | 10    | Empty input, null, wrong format, wrong country code, valid numbers, mock auth |
| `LoginPage.test.jsx`    | 6     | Render, empty submit, invalid format, unregistered number, successful login, loading state |
| `UserCard.test.jsx`     | 3     | Render, click navigation, keyboard (Enter) navigation                         |
| **Total**               | **19**| **19 passing**                                                                |

---

## Key Technical Decisions

- **Context API over Redux** — The app state is limited to authentication. Redux would be over-engineering for this scope.
- **Vite over CRA** — Faster dev server, leaner build output, and current industry standard.
- **DummyJSON over JSONPlaceholder** — Returns real English content with profile pictures for a more realistic user experience.
- **localStorage** — Login state persists across page refreshes without a backend.
- **Session timeout** — Users are automatically logged out after 30 minutes for security.
- **useMemo + debounce** — Search filtering is optimised to avoid unnecessary re-renders and excessive computation on every keystroke.
- **Skeleton loaders** — Provides a better loading experience compared to a plain spinner.
- **PropTypes** — All components are validated for correct prop types.
- **ESLint + Prettier** — Enforces consistent code style and catches potential issues early.