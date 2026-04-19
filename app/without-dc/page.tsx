"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PetalsRain } from "@/components/PetalsRain";
import { useSounds } from "@/hooks/useSounds";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, ShieldCheck, ArrowLeft } from "lucide-react";

const DISCORD_INVITE = "https://discord.gg/TYcTznNYDb";

export default function WithoutDc() {
  const [open, setOpen] = useState(false);
  const { play } = useSounds(true);

  const handleJoinClick = () => {
    play("open");
    setOpen(true);
  };

  const handleConfirm = () => {
    play("success");
    window.open(DISCORD_INVITE, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

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
      <div className="absolute inset-0 bg-background/85" />
      <PetalsRain />

      {/* Anime girl peeking from the right */}
      <Image
        src='/img/anime.png'
        alt="Maskotka rose.owo zachęcająca do dołączenia na Discord"
        className="hidden md:block absolute right-0 bottom-0 h-[85vh] max-h-[800px] w-auto z-10 animate-float pointer-events-none drop-shadow-[0_10px_40px_hsl(340_85%_62%/0.4)]"
        style={{ animationDuration: "5s" }}
        loading="lazy"
        width={1024}
        height={1024}
      />
      {/* Mobile: smaller, top-right */}
      <Image
        src='/img/anime-girl.png'
        alt=""
        aria-hidden
        className="md:hidden absolute -right-12 -top-4 h-56 w-auto z-10 animate-float pointer-events-none"
        loading="lazy"
        width={1024}
        height={1024}
      />

      <section className="relative z-20 w-full max-w-2xl md:mr-[40%] animate-fade-in">
        <Link
          href="/"
          onClick={() => play("click")}
          className="mc-chip mb-6 hover:brightness-125 transition inline-flex"
        >
          <ArrowLeft className="w-3 h-3" /> WRÓĆ
        </Link>

        <header className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Image src='/img/rose.png' alt="" width={40} height={40} className="w-10 h-10" style={{ imageRendering: "pixelated" }} />
            <h1 className="mc-font text-xl md:text-3xl text-mc-rose text-shadow-mc">
              HEJ, POCZEKAJ!
            </h1>
          </div>
          <div className="pixel-divider w-40" />
        </header>

        <div className="mc-panel mc-panel-glow space-y-5 animate-scale-in">
          {/* Speech bubble style */}
          <div className="relative bg-black/40 p-4 mc-block">
            <p className="text-2xl leading-snug">
              <span className="text-mc-rose mc-font block mb-2" style={{ fontSize: "11px" }}>
                ◆ MIKO MÓWI:
              </span>
              Hej hej~! 🌸 Chcesz z nami pograć na <span className="text-mc-rose">rose.owo</span>?
              <br />
              Najpierw musisz dołączyć na nasz <span className="text-accent">Discord</span> —
              tam ogarniamy whitelistę, eventy i całą społeczność!
            </p>
          </div>

          <ul className="space-y-2 text-lg">
            <li className="flex gap-3 items-start">
              <span className="text-mc-grass mc-font mt-1" style={{ fontSize: "10px" }}>✓</span>
              Dostęp do whitelisty serwera Minecraft
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-mc-grass mc-font mt-1" style={{ fontSize: "10px" }}>✓</span>
              Eventy, konkursy i nagrody w grze
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-mc-grass mc-font mt-1" style={{ fontSize: "10px" }}>✓</span>
              Pomoc adminów i miła społeczność
            </li>
          </ul>

          <button
            onClick={handleJoinClick}
            className="mc-btn w-full bg-[#5865F2] text-white animate-glow-pulse"
          >
            🌹 Dołącz na serwer
          </button>

          <p className="text-sm text-muted-foreground text-center">
            Po dołączeniu wróć i zaloguj się ponownie.
          </p>
        </div>
      </section>

      {/* External link confirmation modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="mc-panel border-0 max-w-md">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <ExternalLink className="w-6 h-6 text-mc-rose" />
              <DialogTitle className="mc-font text-mc-rose text-shadow-mc-sm" style={{ fontSize: "12px" }}>
                ZEWNĘTRZNY LINK
              </DialogTitle>
            </div>
            <DialogDescription className="text-lg text-foreground space-y-3">
              <span className="block">
                Za chwilę zostaniesz przeniesiony do{" "}
                <span className="text-accent">Discorda</span> — strony zewnętrznej
                spoza naszej domeny.
              </span>
              <span className="block bg-black/40 p-3 mc-block break-all text-base font-mono text-mc-rose">
                {DISCORD_INVITE}
              </span>
              <span className="block text-base text-muted-foreground">
                Discord to platforma, której używamy do zarządzania społecznością
                rose.owo — zaproszenia, whitelisty i komunikacji z graczami. Link
                otworzy się w nowej karcie.
              </span>
              <span className="flex items-start gap-2 text-base text-mc-grass pt-1">
                <ShieldCheck className="w-4 h-4 mt-1 shrink-0" />
                <span>To oficjalny link naszego serwera. Nigdy nie podawaj nikomu hasła do konta.</span>
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2 pt-2">
            <button
              onClick={() => {
                play("click");
                setOpen(false);
              }}
              className="mc-btn bg-muted text-foreground flex-1"
            >
              Anuluj
            </button>
            <button
              onClick={handleConfirm}
              className="mc-btn bg-mc-rose text-primary-foreground flex-1"
            >
              ▶ Otwórz Discord
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}