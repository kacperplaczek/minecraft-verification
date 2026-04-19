<div align="center">

<img src="../public/img/rose.png" width="48" />

# 🌹 rose.owo — Documentation EN

[🇵🇱 Wersja polska](pl.md) · [🏠 Back to README](../README.md)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Discord OAuth2 Setup](#-discord-oauth2-setup)
- [Running the App](#-running-the-app)
- [MVVM Architecture](#-mvvm-architecture)

---

## 🌸 About

**rose.owo** is a web-based Minecraft whitelist system for a private server. It allows players to log in with their Discord account, submit their Minecraft Premium username, and get automatically added to the server whitelist.

### How it works

1. Player visits the site and logs in via **Discord OAuth2**
2. The system checks if the player is a **member of the Discord server**
3. Player submits their **Minecraft Premium username** (verified via Mojang API)
4. The username is automatically added to the **server whitelist**

---

## 🛠 Tech Stack

| Technology                               | Version | Purpose             |
| ---------------------------------------- | ------- | ------------------- |
| [Next.js](https://nextjs.org)            | 15      | Fullstack framework |
| [TypeScript](https://typescriptlang.org) | 5       | Type safety         |
| [NextAuth.js](https://next-auth.js.org)  | 5       | Discord OAuth2 auth |
| [Tailwind CSS](https://tailwindcss.com)  | 4       | Styling             |
| [SQLite](https://sqlite.org)             | -       | Whitelist database  |
| [Sonner](https://sonner.emilkowal.ski)   | -       | Toast notifications |
| [Lucide React](https://lucide.dev)       | -       | Icons               |

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router (routing only)
│   ├── page.tsx
│   ├── polityka-prywatnosci/
│   │   └── page.tsx
│   ├── without-dc/
│   │   └── page.tsx
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts
│       └── whitelist/
│           └── route.ts
├── features/                     # Business logic (MVVM)
│   ├── whitelist/                # Main whitelist page
│   │   ├── components/
│   │   │   ├── LoginCard/
│   │   │   ├── FormCard/
│   │   │   ├── AddedCard/
│   │   │   ├── LogoutButton.tsx
│   │   │   ├── CheckingCard.tsx
│   │   │   └── StatusLine.tsx
│   │   ├── services/
│   │   │   └── whitelist.service.ts
│   │   ├── model.ts
│   │   ├── types.d.ts
│   │   ├── view.tsx
│   │   ├── viewmodel.ts
│   │   └── index.ts
│   ├── without-dc/               # Page for players without Discord
│   │   ├── components/
│   │   │   └── ConfirmDialog.tsx
│   │   ├── model.ts
│   │   ├── types.d.ts
│   │   ├── view.tsx
│   │   ├── viewmodel.ts
│   │   └── index.ts
│   └── privacy-policy/           # Privacy policy page
│       ├── components/
│       │   ├── Section.tsx
│       │   ├── Li.tsx
│       │   └── Divider.tsx
│       ├── model.ts
│       ├── view.tsx
│       └── index.ts
├── components/                   # Reusable UI components
│   ├── PetalsRain.tsx
│   └── ui/
├── hooks/
│   └── useSounds.ts
└── auth.ts                       # NextAuth configuration
```

---

## ✅ Requirements

- **Node.js** >= 18
- **npm** / **yarn** / **pnpm**
- **Discord Developer** account (to create an OAuth2 app)
- **Minecraft NeoForge 1.21.1** server with a whitelist mod

---

## 🚀 Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/minecraft-verification.git
cd minecraft-verification

# 2. Install dependencies
npm install

# 3. Copy the environment variables file
cp env.example.txt .env.local

# 4. Fill in .env.local (see section below)

# 5. Start the development server
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Discord OAuth2
AUTH_DISCORD_ID=your_client_id
AUTH_DISCORD_SECRET=your_client_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=random_secret_string

# Discord Bot (for membership verification)
DISCORD_BOT_TOKEN=your_bot_token
DISCORD_GUILD_ID=your_server_id
```

### How to generate `AUTH_SECRET`?

```bash
openssl rand -base64 32
```

---

## 🔧 Discord OAuth2 Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application (**New Application**)
3. Navigate to the **OAuth2** tab
4. Copy the **Client ID** and **Client Secret** to `.env.local`
5. Under **Redirects**, add:

   ```
   http://localhost:3000/api/auth/callback/discord
   ```

   > In production, replace with your domain, e.g. `https://rose.owo/api/auth/callback/discord`

6. Go to the **Bot** tab and copy the **Token** to `.env.local`
7. Enable bot permissions: **Server Members Intent**

---

## ▶️ Running the App

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

App available at: [http://localhost:3000](http://localhost:3000)

---

## 🏗 MVVM Architecture

The project uses the **MVVM (Model-View-ViewModel)** pattern combined with a **feature-based structure**.

| File           | Responsibility                               |
| -------------- | -------------------------------------------- |
| `model.ts`     | Constants, config, API calls                 |
| `viewmodel.ts` | Component state, logic, events (custom hook) |
| `view.tsx`     | Pure UI, zero business logic                 |
| `types.d.ts`   | TypeScript types for the feature             |
| `index.ts`     | Public feature export                        |

> Small components (< ~30 lines, pure UI) are kept as single `.tsx` files without MVVM splitting.
