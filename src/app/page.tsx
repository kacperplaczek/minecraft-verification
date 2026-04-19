"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSounds } from "@/hooks/useSounds";
import { PetalsRain } from "@/components/PetalsRain";
import { Volume2, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";


type Step = "login" | "checking-server" | "form" | "added";

const SERVER_NAME = "rose.owo";

export default function Index() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [step, setStep] = useState<Step>("login");
  const [nick, setNick] = useState("");
  const [nickStatus, setNickStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [skinUrl, setSkinUrl] = useState<string | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const debounce = useRef<number | null>(null);
  const { play } = useSounds(soundOn);

  
  useEffect(() => {
    if (status !== "authenticated") return;
    play("open");
    setTimeout(() => {
      play("level");
      setStep("form");
    }, 1600);
  }, [status]);

    const handleLogin = async () => {
      play("click");
      await signIn("discord", { callbackUrl: "/" });
    };

  // Debounced Mojang lookup
  useEffect(() => {
    if (step !== "form") return;
    setNickStatus("idle");
    setSkinUrl(null);
    if (!nick || nick.length < 3) return;
    if (debounce.current) window.clearTimeout(debounce.current);
    setNickStatus("checking");
    debounce.current = window.setTimeout(async () => {
      try {
        const res = await fetch(`https://playerdb.co/api/player/minecraft/${encodeURIComponent(nick)}`);
        const data = await res.json();
        if (data?.success && data?.data?.player?.id) {
          setNickStatus("valid");
          setSkinUrl(`https://mc-heads.net/avatar/${data.data.player.id}/128`);
          play("level");
        } else {
          setNickStatus("invalid");
          play("error");
        }
      } catch {
        setNickStatus("invalid");
        play("error");
      }
    }, 600);
    return () => {
      if (debounce.current) window.clearTimeout(debounce.current);
    };
  }, [nick, step]);

  const addToWhitelist = async () => {
    const res = await fetch("/api/whitelist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ minecraftUsername: nick }),
    });

    if (res.ok) {
      play("success");
      toast.success(`${nick} dodany do whitelisty!`, {
        description: `Witaj na ${SERVER_NAME} 🌹`,
      });
      setStep("added");
    } else {
      const { error } = await res.json();
      play("error");
      toast.error("Błąd: " + error);
    }
  };

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-clip"
      style={{
        backgroundImage: `url(/img/mc-bg.jpg)`,
        backgroundSize: "256px 256px",
        backgroundRepeat: "repeat",
        imageRendering: "pixelated",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <PetalsRain />
      <LogoutButton />

      <button
        onClick={() => {
          setSoundOn((s) => !s);
          play("click");
        }}
        className="absolute top-4 right-4 z-20 mc-chip hover:brightness-125 transition"
        aria-label="Przełącz dźwięk"
      >
        {soundOn ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
        {soundOn ? "SOUND ON" : "MUTED"}
      </button>

      <section className="relative z-10 w-full max-w-xl animate-fade-in">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image src={'/img/rose.png'} alt="" width={48} height={48} className="w-12 h-12 animate-float" style={{ imageRendering: "pixelated" }} />
            <h1 className="mc-font text-2xl md:text-4xl text-mc-rose text-shadow-mc">
              ROSE.OWO
            </h1>
            <Image src={'/img/rose.png'} alt="" width={48} height={48} className="w-12 h-12 animate-float" style={{ imageRendering: "pixelated", animationDelay: "1.5s" }} />
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="mc-chip text-accent">⛏ MINECRAFT</span>
            <span className="mc-chip text-mc-rose">🌹 WHITELIST</span>
          </div>
          <div className="pixel-divider w-48 mx-auto" />
        </header>

        {step === "login" && <LoginCard onLogin={handleLogin} onHover={() => play("type")} />}
        {step === "checking-server" && <CheckingCard />}
        {step === "form" && (
          <FormCard
            nick={nick}
            setNick={(v) => {
              setNick(v);
              if (v.length > nick.length) play("type");
            }}
            nickStatus={nickStatus}
            skinUrl={skinUrl}
            onSubmit={addToWhitelist}
          />
        )}
        {step === "added" && <AddedCard nick={nick} skinUrl={skinUrl} />}

        <p className="text-center text-muted-foreground mt-8 mc-font" style={{ fontSize: "10px" }}>
          v1.0 · {SERVER_NAME}
        </p>
      </section>
    </main>
  );
}

function LoginCard({ onLogin, onHover }: { onLogin: () => void; onHover: () => void }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="mc-panel mc-panel-glow text-center space-y-6 animate-scale-in">
      <div className="flex justify-center">
        <div className="w-20 h-20 mc-block bg-[#5865F2] flex items-center justify-center text-4xl animate-float">
          🎮
        </div>
      </div>
      <p className="text-2xl leading-snug">
        Zaloguj się przez Discord aby uzyskać dostęp do whitelisty serwera{" "}
        <span className="text-mc-rose">rose.owo</span>.
      </p>

      {/* Checkbox polityki */}
      <div
        className="flex items-start gap-3 cursor-pointer text-left"
        onClick={() => setAccepted((v) => !v)}
      >
        <div className="relative mt-1 shrink-0">
          <div
            className="w-5 h-5 mc-block flex items-center justify-center"
            style={{
              background: accepted ? "hsl(var(--mc-rose))" : "hsl(var(--input))",
              transition: "background 0.15s",
            }}
          >
            {accepted && <span style={{ fontSize: "14px", lineHeight: 1 }}>✓</span>}
          </div>
        </div>
        <span style={{ fontSize: "16px", fontFamily: "VT323, monospace" }}>
          Zapoznałem/am się z{" "}
          <Link
            href="/polityka-prywatnosci"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mc-rose hover:brightness-125 transition underline"
            onClick={(e) => e.stopPropagation()}
          >
            polityką prywatności
          </Link>{" "}
          i akceptuję warunki przetwarzania danych osobowych.
        </span>
      </div>

      <button
        onClick={onLogin}
        onMouseEnter={onHover}
        disabled={!accepted}
        className="mc-btn bg-[#5865F2] text-white w-full"
      >
        ▶ Zaloguj przez Discord
      </button>
      <p className="text-sm text-muted-foreground">Tylko członkowie serwera <strong>rose.owo</strong> mają dostęp do serwera Minecraft.</p>
    </div>
  );
}

function LogoutButton() {
  const { data: session } = useSession();
  if (!session) return null;

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="fixed bottom-4 right-4 z-20 mc-btn bg-card text-foreground flex items-center gap-3"
      style={{ fontSize: "10px" }}
    >
      {session.user?.image && (
        <img
          src={session.user.image}
          alt="avatar"
          width={24}
          height={24}
          className="mc-block"
          style={{ imageRendering: "pixelated", width: 24, height: 24 }}
        />
      )}
      WYLOGUJ SIĘ
    </button>
  );
}

function CheckingCard() {
  return (
    <div className="mc-panel text-center space-y-5 animate-scale-in">
      <div className="text-5xl inline-block animate-spin-slow">⛏️</div>
      <p className="text-2xl">Kopanie w bazie Discord...</p>
      <div className="mc-bar">
        <div className="mc-bar-fill" style={{ width: "100%", animation: "pulse 1.2s ease-in-out infinite" }} />
      </div>
      <p className="mc-font text-mc-rose" style={{ fontSize: "10px" }}>SPRAWDZAM CZŁONKOSTWO ROSE.OWO</p>
    </div>
  );
}

function FormCard({
  nick,
  setNick,
  nickStatus,
  skinUrl,
  onSubmit,
}: {
  nick: string;
  setNick: (v: string) => void;
  nickStatus: "idle" | "checking" | "valid" | "invalid";
  skinUrl: string | null;
  onSubmit: () => void;
}) {
  return (
    <div className="mc-panel space-y-6 animate-scale-in">
      <div className="pb-4 border-b-4 border-border flex items-center justify-between gap-3">
        <p className="mc-font text-mc-grass text-shadow-mc-sm" style={{ fontSize: "10px" }}>
          ✓ ZWERYFIKOWANO · ROSE.OWO
        </p>
        <span className="mc-chip text-mc-diamond">◆ MEMBER</span>
      </div>

      <div className="space-y-3">
        <label className="mc-font text-mc-rose block" style={{ fontSize: "10px" }}>
          NICK MINECRAFT (PREMIUM)
        </label>
        <div className="flex gap-3 items-center">
          <div className={`relative ${nickStatus === "valid" ? "animate-pop" : ""}`}>
            {skinUrl ? (
              <img
                src={skinUrl}
                alt={nick}
                className={`w-16 h-16 mc-block ${nickStatus === "valid" ? "animate-glow-pulse" : ""}`}
                width={64}
                height={64}
              />
            ) : (
              <div className="w-16 h-16 mc-block bg-muted flex items-center justify-center text-3xl text-muted-foreground">
                ?
              </div>
            )}
          </div>
          <input
            value={nick}
            onChange={(e) => setNick(e.target.value.trim())}
            placeholder="np. Notch"
            className="mc-input flex-1"
            maxLength={16}
            autoFocus
          />
        </div>

        <div className="space-y-1">
          <div className="mc-bar">
            <div
              className="mc-bar-fill"
              style={{
                width:
                  nickStatus === "valid"
                    ? "100%"
                    : nickStatus === "checking"
                      ? "60%"
                      : nickStatus === "invalid"
                        ? "100%"
                        : `${Math.min(nick.length * 6, 40)}%`,
                background:
                  nickStatus === "invalid"
                    ? "hsl(var(--destructive))"
                    : nickStatus === "valid"
                      ? "linear-gradient(90deg, hsl(var(--mc-grass)), hsl(var(--mc-diamond)))"
                      : undefined,
              }}
            />
          </div>
          <StatusLine status={nickStatus} />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={nickStatus !== "valid"}
        className="mc-btn w-full bg-mc-rose text-primary-foreground"
      >
        🌹 Dodaj mnie do whitelist
      </button>
    </div>
  );
}

function StatusLine({ status }: { status: "idle" | "checking" | "valid" | "invalid" }) {
  if (status === "idle")
    return <p className="text-base text-muted-foreground">Wpisz nick swojego konta premium.</p>;
  if (status === "checking")
    return <p className="text-base text-accent animate-pulse">⏳ Sprawdzam w bazie Mojang...</p>;
  if (status === "valid")
    return <p className="text-base text-mc-grass animate-fade-in">✓ Konto premium zweryfikowane!</p>;
  return <p className="text-base text-destructive animate-fade-in">✗ Nick nie istnieje lub nie jest premium.</p>;
}

function AddedCard({ nick, skinUrl }: { nick: string; skinUrl: string | null }) {
  return (
    <div className="mc-panel mc-panel-glow text-center space-y-4 border-l-8 border-mc-rose animate-pop">
      <div className="text-5xl animate-float">🌹</div>
      <h2 className="mc-font text-mc-rose text-shadow-mc-sm" style={{ fontSize: "12px" }}>
        DODANO DO WHITELISTY
      </h2>
      {skinUrl && (
        <img
          src={skinUrl}
          alt={nick}
          className="w-20 h-20 mc-block mx-auto animate-glow-pulse"
          width={80}
          height={80}
        />
      )}
      <p className="text-3xl mc-font text-shadow-mc-sm" style={{ fontSize: "16px" }}>{nick}</p>
      <div className="pixel-divider w-32 mx-auto" />
      <p className="text-lg text-muted-foreground">Widzimy się na rose.owo!</p>
    </div>
  );
}