# capstone-frontend-track

> A frontend development track focused on AI-assisted development, leveraging the MERN stack with integrated AI/ML capabilities.

---

## 🚀 Overview

**capstone-frontend-track** is a structured capstone project designed to explore the intersection of modern full-stack web development and artificial intelligence. This track emphasizes building production-ready applications with AI-assisted tooling, smart integrations, and scalable architecture.

Whether you're building intelligent user interfaces, integrating ML models into REST APIs, or leveraging AI coding assistants in your workflow — this track covers it all.

---

## 🧠 AI-Assisted Development

This project track embraces AI-assisted development as a core methodology:

- **AI Coding Assistants** — Leveraging tools like GitHub Copilot, Antigravity, and ChatGPT to accelerate development.
- **AI/ML Integrations** — Embedding machine learning models and AI APIs directly into application features.
- **Prompt Engineering** — Crafting effective prompts to generate, refactor, and review code.
- **Automated Code Review** — Using AI tooling to maintain code quality and consistency.

---

## 🛠 Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Frontend     | React.js (functional components)    |
| Backend      | Node.js + Express.js                |
| Database     | MongoDB (via Mongoose)              |
| AI/ML        | OpenAI API / TensorFlow.js / custom integrations |
| Version Control | Git with Conventional Commits    |
| Package Manager | npm / yarn                       |

---

## 📁 Project Structure

```
capstone-frontend-track/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Route-level page components
│       ├── hooks/          # Custom React hooks
│       ├── services/       # API service modules
│       ├── context/        # React context providers
│       └── utils/          # Utility/helper functions
├── server/                 # Node.js + Express backend
│   ├── controllers/        # Route handler logic
│   ├── models/             # Mongoose data models
│   ├── routes/             # Express route definitions
│   ├── middleware/         # Custom middleware
│   ├── services/           # Business logic & AI integrations
│   └── utils/              # Server-side utilities
├── .gitignore
├── CLAUDE.md               # AI assistant context & conventions
├── LICENSE
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+ or **yarn**
- **MongoDB** (local or via MongoDB Atlas)
- A `.env` file with required environment variables (see `.env.example`)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/capstone-frontend-track.git
cd capstone-frontend-track

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Running Locally

```bash
# Start the backend server (from /server)
npm run dev

# Start the React frontend (from /client)
npm start
```

The backend will run on `http://localhost:5000` and the frontend on `http://localhost:3000` by default.

---

## 📜 Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages:

```
<type>(optional scope): <short description>

Types: feat | fix | docs | style | refactor | test | chore
```

**Examples:**
```
feat(auth): add JWT-based login endpoint
fix(ui): resolve button alignment on mobile
docs: update README with setup instructions
refactor(api): extract AI service into dedicated module
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Make your changes following the coding conventions in [`CLAUDE.md`](./CLAUDE.md)
4. Commit using Conventional Commits format
5. Open a pull request

---

## 📄 License

This project is licensed under the terms of the [LICENSE](./LICENSE) file.
