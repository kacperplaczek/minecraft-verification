"use client";

import Image from "next/image";
import Link from "next/link";
import { PetalsRain } from "@/components/PetalsRain";

const SERVER_NAME = "rose.owo - Serwer Discord dla Graczy";
const CONTACT_EMAIL = "xk.placzek@gmail.com";
const LAST_UPDATED = "19 kwietnia 2025";

export default function PrivacyPolicy() {
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(/img/mc-bg.jpg)`,
        backgroundSize: "256px 256px",
        backgroundRepeat: "repeat",
        imageRendering: "pixelated",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <PetalsRain />

      <section className="relative z-10 w-full max-w-2xl animate-fade-in py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image
              src="/img/rose.png"
              alt=""
              width={48}
              height={48}
              className="w-12 h-12 animate-float"
              style={{ imageRendering: "pixelated" }}
            />
            <h1 className="mc-font text-2xl md:text-3xl text-mc-rose text-shadow-mc">
              ROSE.OWO
            </h1>
            <Image
              src="/img/rose.png"
              alt=""
              width={48}
              height={48}
              className="w-12 h-12 animate-float"
              style={{ imageRendering: "pixelated", animationDelay: "1.5s" }}
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="mc-chip text-mc-rose">🌹 POLITYKA PRYWATNOŚCI</span>
          </div>
          <div className="pixel-divider w-48 mx-auto" />
        </header>

        {/* Content */}
        <div className="mc-panel space-y-6 animate-scale-in">
          <div className="pb-4 border-b-4 border-border flex items-center justify-between gap-3 flex-wrap">
            <p className="mc-font text-mc-grass text-shadow-mc-sm" style={{ fontSize: "10px" }}>
              ✓ OSTATNIA AKTUALIZACJA
            </p>
            <span className="mc-chip text-mc-diamond">◆ {LAST_UPDATED}</span>
          </div>

          <Section title="§1 · Administrator danych">
            <p>
              Administratorem danych osobowych jest operator serwera Minecraft{" "}
              <span className="text-mc-rose">{SERVER_NAME}</span>. W sprawach
              dotyczących danych osobowych możesz skontaktować się pod adresem
              e-mail:{" "}
              <span className="text-mc-diamond">{CONTACT_EMAIL}</span>.
            </p>
          </Section>

          <Divider />

          <Section title="§2 · Jakie dane zbieramy">
            <p>W ramach korzystania z serwisu zbieramy następujące dane:</p>
            <ul className="space-y-2 mt-3">
              <Li>
                <strong className="text-mc-rose">Discord ID</strong> — unikalny
                identyfikator Twojego konta Discord, uzyskiwany podczas logowania
                przez OAuth2.
              </Li>
              <Li>
                <strong className="text-mc-rose">Nazwa użytkownika Discord</strong>{" "}
                — Twój aktualny nick na Discordzie w momencie logowania.
              </Li>
              <Li>
                <strong className="text-mc-rose">Nick Minecraft</strong> — nazwa
                konta Minecraft (premium), którą podajesz dobrowolnie w formularzu
                whitelisty.
              </Li>
              <Li>
                <strong className="text-mc-rose">Data rejestracji</strong> — czas
                dodania do whitelisty.
              </Li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              Nie zbieramy haseł, adresów e-mail ani żadnych innych danych
              wrażliwych.
            </p>
          </Section>

          <Divider />

          <Section title="§3 · Cel i podstawa przetwarzania">
            <p>Dane przetwarzamy wyłącznie w celu:</p>
            <ul className="space-y-2 mt-3">
              <Li>
                Weryfikacji członkostwa na serwerze Discord{" "}
                <span className="text-mc-rose">{SERVER_NAME}</span> (art. 6 ust. 1
                lit. b RODO — niezbędność do wykonania umowy/usługi).
              </Li>
              <Li>
                Zarządzania whitelistą serwera Minecraft i umożliwienia Ci dostępu
                do gry.
              </Li>
              <Li>
                Ochrony serwera przed nieautoryzowanym dostępem.
              </Li>
            </ul>
          </Section>

          <Divider />

          <Section title="§4 · Okres przechowywania danych">
            <p>
              Dane przechowujemy przez czas Twojego członkostwa na serwerze
              Discord <span className="text-mc-rose">{SERVER_NAME}</span> lub do
              momentu usunięcia Twojego wpisu z whitelisty. Po opuszczeniu serwera
              Discord lub na Twoje żądanie dane zostaną usunięte w ciągu{" "}
              <strong className="text-mc-diamond">14 dni</strong>.
            </p>
          </Section>

          <Divider />

          <Section title="§5 · Udostępnianie danych">
            <p>
              Twoje dane <strong className="text-mc-rose">nie są sprzedawane</strong>{" "}
              ani udostępniane podmiotom trzecim w celach komercyjnych. Dane mogą
              być przekazywane wyłącznie:
            </p>
            <ul className="space-y-2 mt-3">
              <Li>
                <strong className="text-mc-diamond">Discord Inc.</strong> — w
                zakresie niezbędnym do uwierzytelnienia przez OAuth2 (zgodnie z
                polityką prywatności Discord).
              </Li>
              <Li>
                <strong className="text-mc-diamond">Mojang / Microsoft</strong> —
                wyłącznie w celu weryfikacji konta premium Minecraft poprzez
                publiczne API.
              </Li>
            </ul>
          </Section>

          <Divider />

          <Section title="§6 · Twoje prawa">
            <p>Na podstawie RODO przysługują Ci następujące prawa:</p>
            <ul className="space-y-2 mt-3">
              <Li>
                <strong className="text-mc-rose">Prawo dostępu</strong> — możesz
                zapytać jakie dane przechowujemy na Twój temat.
              </Li>
              <Li>
                <strong className="text-mc-rose">Prawo do usunięcia</strong> —
                możesz zażądać usunięcia swoich danych w dowolnym momencie.
              </Li>
              <Li>
                <strong className="text-mc-rose">Prawo do sprostowania</strong> —
                możesz poprosić o aktualizację swoich danych (np. zmianę nicku
                Minecraft).
              </Li>
              <Li>
                <strong className="text-mc-rose">Prawo do sprzeciwu</strong> —
                możesz wnieść sprzeciw wobec przetwarzania danych.
              </Li>
            </ul>
            <p className="mt-3">
              Aby skorzystać z powyższych praw, skontaktuj się z nami przez:{" "}
              <span className="text-mc-diamond">{CONTACT_EMAIL}</span> lub
              bezpośrednio na serwerze Discord.
            </p>
          </Section>

          <Divider />

          <Section title="§7 · Pliki cookie i sesje">
            <p>
              Serwis używa wyłącznie sesyjnych plików cookie niezbędnych do
              działania autoryzacji (NextAuth.js). Nie używamy plików cookie
              reklamowych, śledzących ani analitycznych. Sesja wygasa automatycznie
              po zamknięciu przeglądarki lub po upływie czasu jej ważności.
            </p>
          </Section>

          <Divider />

          <Section title="§8 · Bezpieczeństwo">
            <p>
              Dane przechowywane są lokalnie w zabezpieczonej bazie danych SQLite
              na serwerze. Stosujemy szyfrowane połączenia (HTTPS) oraz
              uwierzytelnianie przez zaufanych dostawców (Discord OAuth2). Dostęp
              do bazy danych mają wyłącznie administratorzy serwisu.
            </p>
          </Section>

          <Divider />

          <Section title="§9 · Zmiany polityki prywatności">
            <p>
              Zastrzegamy sobie prawo do aktualizacji niniejszej polityki
              prywatności. O istotnych zmianach poinformujemy na serwerze Discord{" "}
              <span className="text-mc-rose">{SERVER_NAME}</span>. Data ostatniej
              aktualizacji widoczna jest na górze tej strony.
            </p>
          </Section>

          <Divider />

          {/* Back button */}
          <div className="pt-2">
            <Link href="/" className="mc-btn bg-mc-rose text-white w-full block text-center">
              ← WRÓĆ DO STRONY GŁÓWNEJ
            </Link>
          </div>
        </div>

        <p className="text-center text-muted-foreground mt-8 mc-font" style={{ fontSize: "10px" }}>
          v1.0 · {SERVER_NAME} · POLITYKA PRYWATNOŚCI
        </p>
      </section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2
        className="mc-font text-mc-rose text-shadow-mc-sm"
        style={{ fontSize: "11px" }}
      >
        {title}
      </h2>
      <div className="text-foreground leading-relaxed space-y-2" style={{ fontSize: "18px", fontFamily: "VT323, monospace" }}>
        {children}
      </div>
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 items-start" style={{ fontSize: "18px", fontFamily: "VT323, monospace" }}>
      <span className="text-mc-rose mt-0.5 shrink-0">▸</span>
      <span>{children}</span>
    </li>
  );
}

function Divider() {
  return <div className="pixel-divider w-full opacity-40" />;
}
