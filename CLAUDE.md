# CLAUDE.md — AI Assistant Context

This file provides context for AI coding assistants (Claude, Antigravity, Copilot, etc.) working in this repository. Follow all conventions described here when generating, refactoring, or reviewing code.

---

## 🗂 Project Overview

- **Project**: capstone-frontend-track
- **Purpose**: Full-stack capstone track focused on AI-assisted development
- **Stack**: MERN (MongoDB, Express, React, Node.js) with AI/ML integrations

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React.js
- **Component Style**: Functional components with hooks — **no class components**
- **State Management**: React Context API or Zustand (avoid Redux unless justified)
- **Styling**: CSS Modules or plain CSS (no inline styles for layout)
- **Routing**: React Router v6+
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database ODM**: Mongoose (for MongoDB)
- **Auth**: JWT (JSON Web Tokens) via `jsonwebtoken`
- **Environment Variables**: `dotenv` — never hardcode secrets

### Database
- **Database**: MongoDB
- **ODM**: Mongoose with explicit schema definitions
- **Naming**: Use camelCase for field names in schemas

### AI/ML Integration
- **APIs**: OpenAI API, Google Gemini API, or similar LLM providers
- **Client-side ML**: TensorFlow.js where applicable
- **AI services** live in `server/services/` and are consumed by controllers — keep AI logic decoupled from route handlers

---

## 📁 File & Folder Conventions

- **Modular structure**: Each feature or domain gets its own folder
- **One responsibility per file**: Components, hooks, services, and utilities should each do one thing well
- **Named exports preferred** over default exports for components and utilities
- **File naming**:
  - React components: `PascalCase.jsx` (e.g., `UserCard.jsx`)
  - Hooks: `camelCase` prefixed with `use` (e.g., `useAuth.js`)
  - Utilities/services: `camelCase.js` (e.g., `aiService.js`)
  - Routes/controllers: `camelCase.js` (e.g., `authController.js`)

---

## ⚛️ React Conventions

```jsx
// ✅ Preferred: Functional component with named export
import { useState, useEffect } from 'react';

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch user data
  }, [userId]);

  return <div>{user?.name}</div>;
}

// ❌ Avoid: Class components
// ❌ Avoid: Default exports for components
```

- **Props**: Destructure in function signature
- **Effects**: Always include a dependency array in `useEffect`
- **Event handlers**: Name with `handle` prefix (e.g., `handleSubmit`, `handleChange`)
- **Avoid** mixing UI logic with data-fetching logic — extract custom hooks for data fetching

---

## 🖥 Node/Express Conventions

```js
// ✅ Preferred controller structure
export const getUser = async (req, res) => {
  try {
    const user = await UserService.findById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

- **Async/await** over `.then()/.catch()` chains
- **Always wrap async route handlers in try/catch**
- **Consistent response shape**: `{ success: boolean, data?: any, message?: string }`
- **Middleware** for auth, validation, and error handling — keep controllers thin
- **Environment-specific config** via `dotenv` — never commit `.env` files

---

## 🗄 Mongoose Schema Conventions

```js
// ✅ Example schema
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
```

- Always include `{ timestamps: true }` in schema options
- Use explicit field validation (`required`, `trim`, `lowercase`, `enum`, etc.)
- Model names: `PascalCase` singular (e.g., `User`, `Post`, `AiSession`)

---

## 📝 Commit Convention

All commits **must** follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(optional scope): <short imperative description>
```

| Type       | When to use                                   |
|------------|-----------------------------------------------|
| `feat`     | A new feature                                 |
| `fix`      | A bug fix                                     |
| `docs`     | Documentation changes only                   |
| `style`    | Formatting, missing semicolons (no logic change) |
| `refactor` | Code change that is neither a fix nor feature |
| `test`     | Adding or updating tests                      |
| `chore`    | Build process, dependency updates, tooling    |

**Examples:**
```
feat(chat): integrate OpenAI streaming response
fix(auth): handle expired JWT tokens gracefully
refactor(hooks): extract useUserData from ProfilePage
docs: add API usage examples to README
chore: upgrade mongoose to v8
```

- Keep the subject line under **72 characters**
- Use **imperative mood** ("add", "fix", "update" — not "added", "fixed")
- Reference issues when relevant: `fix(login): resolve redirect loop (#42)`

---

## 🚫 General Don'ts

- Do **not** commit `node_modules/`, `.env`, or build artifacts
- Do **not** use `var` — use `const` or `let`
- Do **not** leave `console.log` statements in production code (use a logger)
- Do **not** write monolithic components — keep them small and composable
- Do **not** hardcode API keys, URLs, or secrets anywhere in the codebase

---

## ✅ General Do's

- Write **self-documenting code** — clear variable/function names over comments
- Add JSDoc comments to utility functions and service methods
- Keep functions **pure** where possible (predictable input → output)
- Handle **loading, error, and empty states** in every UI component that fetches data
- Always validate request data on the **server side**, even if also validated on the client


## Rules learned from the AI workflow drill (add to CLAUDE.md)

- Forms use `react-hook-form` + `zod` for validation — never hand-rolled string checks or uncontrolled inputs. Both are already devDependencies; a form PR without them fails review.
- Every form input must have a `<label htmlFor>` and, when it has a validation error, an `aria-describedby` pointing to the error message element — this is a testable check, not a style preference.
- Any AI agent session that touches the repo must be followed by `git status`/commit-diff review before pushing — check for unrequested file deletions or modifications outside the stated task scope (e.g. `CLAUDE.md`, `LICENSE`), since the agent's own summary is not a reliable record of everything it changed.
