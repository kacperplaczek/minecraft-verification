<div align="center">

<img src="../public/img/rose.png" width="48" />

# 🌹 rose.owo — Dokumentacja PL

[🇬🇧 English version](en.md) · [🏠 Powrót do README](../README.md)

</div>

---

## 📋 Spis treści

- [O projekcie](#-o-projekcie)
- [Technologie](#-technologie)
- [Struktura projektu](#-struktura-projektu)
- [Wymagania](#-wymagania)
- [Instalacja](#-instalacja)
- [Konfiguracja zmiennych środowiskowych](#-konfiguracja-zmiennych-środowiskowych)
- [Konfiguracja Discord OAuth2](#-konfiguracja-discord-oauth2)
- [Uruchomienie](#-uruchomienie)
- [Architektura MVVM](#-architektura-mvvm)

---

## 🌸 O projekcie

**rose.owo** to webowy system whitelisty dla prywatnego serwera Minecraft. Umożliwia graczom zalogowanie się przez konto Discord, podanie swojego nicku Minecraft Premium i automatyczne dodanie do whitelisty serwera.

### Jak to działa?

1. Gracz wchodzi na stronę i loguje się przez **Discord OAuth2**
2. System weryfikuje czy gracz jest **członkiem serwera Discord**
3. Gracz podaje swój **nick Minecraft Premium** (weryfikowany przez API Mojang)
4. Nick zostaje automatycznie dodany do **whitelisty serwera**

---

## 🛠 Technologie

| Technologia                              | Wersja | Zastosowanie               |
| ---------------------------------------- | ------ | -------------------------- |
| [Next.js](https://nextjs.org)            | 15     | Framework fullstack        |
| [TypeScript](https://typescriptlang.org) | 5      | Typowanie                  |
| [NextAuth.js](https://next-auth.js.org)  | 5      | Autoryzacja Discord OAuth2 |
| [Tailwind CSS](https://tailwindcss.com)  | 4      | Stylowanie                 |
| [SQLite](https://sqlite.org)             | -      | Baza danych whitelisty     |
| [Sonner](https://sonner.emilkowal.ski)   | -      | Powiadomienia toast        |
| [Lucide React](https://lucide.dev)       | -      | Ikony                      |

---

## 📁 Struktura projektu

```
src/
├── app/                          # Next.js App Router (tylko routing)
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
├── features/                     # Logika biznesowa (MVVM)
│   ├── whitelist/                # Główna strona whitelisty
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
│   ├── without-dc/               # Strona dla graczy bez Discorda
│   │   ├── components/
│   │   │   └── ConfirmDialog.tsx
│   │   ├── model.ts
│   │   ├── types.d.ts
│   │   ├── view.tsx
│   │   ├── viewmodel.ts
│   │   └── index.ts
│   └── privacy-policy/           # Polityka prywatności
│       ├── components/
│       │   ├── Section.tsx
│       │   ├── Li.tsx
│       │   └── Divider.tsx
│       ├── model.ts
│       ├── view.tsx
│       └── index.ts
├── components/                   # Reużywalne komponenty UI
│   ├── PetalsRain.tsx
│   └── ui/
├── hooks/
│   └── useSounds.ts
└── auth.ts                       # Konfiguracja NextAuth
```

---

## ✅ Wymagania

- **Node.js** >= 18
- **npm** / **yarn** / **pnpm**
- Konto **Discord Developer** (do stworzenia aplikacji OAuth2)
- Serwer **Minecraft NeoForge 1.21.1** z modem do whitelisty

---

## 🚀 Instalacja

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/twoj-nick/minecraft-verification.git
cd minecraft-verification

# 2. Zainstaluj zależności
npm install

# 3. Skopiuj plik zmiennych środowiskowych
cp env.example.txt .env.local

# 4. Uzupełnij .env.local (patrz sekcja niżej)

# 5. Uruchom serwer deweloperski
npm run dev
```

---

## ⚙️ Konfiguracja zmiennych środowiskowych

Utwórz plik `.env.local` w głównym katalogu projektu:

```env
# Discord OAuth2
AUTH_DISCORD_ID=twoje_client_id
AUTH_DISCORD_SECRET=twoj_client_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=losowy_tajny_string

# Discord Bot (do weryfikacji członkostwa)
DISCORD_BOT_TOKEN=token_twojego_bota
DISCORD_GUILD_ID=id_twojego_serwera
```

### Jak wygenerować `AUTH_SECRET`?

```bash
openssl rand -base64 32
```

---

## 🔧 Konfiguracja Discord OAuth2

1. Wejdź na [Discord Developer Portal](https://discord.com/developers/applications)
2. Utwórz nową aplikację (**New Application**)
3. Przejdź do zakładki **OAuth2**
4. Skopiuj **Client ID** i **Client Secret** do `.env.local`
5. W sekcji **Redirects** dodaj:

   ```
   http://localhost:3000/api/auth/callback/discord
   ```

   > Na produkcji zamień na swoją domenę, np. `https://rose.owo/api/auth/callback/discord`

6. Przejdź do zakładki **Bot** i skopiuj **Token** do `.env.local`
7. Włącz uprawnienia bota: **Server Members Intent**

---

## ▶️ Uruchomienie

```bash
# Tryb deweloperski
npm run dev

# Build produkcyjny
npm run build
npm start
```

Aplikacja dostępna pod adresem: [http://localhost:3000](http://localhost:3000)

---

## 🏗 Architektura MVVM

Projekt używa wzorca **MVVM (Model-View-ViewModel)** połączonego z **feature-based structure**.

| Plik           | Odpowiedzialność                              |
| -------------- | --------------------------------------------- |
| `model.ts`     | Stałe, konfiguracja, wywołania API            |
| `viewmodel.ts` | Stan komponentu, logika, eventy (custom hook) |
| `view.tsx`     | Czysty UI, zero logiki biznesowej             |
| `types.d.ts`   | Typy TypeScript dla danego feature            |
| `index.ts`     | Publiczny eksport feature                     |

> Małe komponenty (< ~30 linii, czysty UI) są trzymane jako pojedyncze pliki `.tsx` bez podziału na MVVM.

---

## ☕ Wesprzyj projekt

Jeśli projekt Ci się podoba, możesz postawić mi kawę!

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/kacperplaczek)
