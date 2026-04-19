"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { PetalsRain } from "@/components/PetalsRain"
import { useSounds } from "@/hooks/useSounds"
import { ConfirmDialog } from "./components/ConfirmDialog"
import { useWithoutDc } from "./viewmodel"
import { DISCORD_INVITE, BENEFITS } from "./model"

export function WithoutDcView() {
  const vm = useWithoutDc()
  const { play } = useSounds(true)

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

      <Image
        src="/img/anime.png"
        alt="Maskotka rose.owo zachęcająca do dołączenia na Discord"
        className="hidden md:block absolute right-0 bottom-0 h-[85vh] max-h-[800px] w-auto z-10 animate-float pointer-events-none drop-shadow-[0_10px_40px_hsl(340_85%_62%/0.4)]"
        style={{ animationDuration: "5s" }}
        loading="lazy"
        width={1024}
        height={1024}
      />
      <Image
        src="/img/anime-girl.png"
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
            <Image src="/img/rose.png" alt="" width={40} height={40} className="w-10 h-10" style={{ imageRendering: "pixelated" }} />
            <h1 className="mc-font text-xl md:text-3xl text-mc-rose text-shadow-mc">
              HEJ, POCZEKAJ!
            </h1>
          </div>
          <div className="pixel-divider w-40" />
        </header>

        <div className="mc-panel mc-panel-glow space-y-5 animate-scale-in">
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
            {BENEFITS.map((benefit, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-mc-grass mc-font mt-1" style={{ fontSize: "10px" }}>✓</span>
                {benefit}
              </li>
            ))}
          </ul>

          <button
            onClick={vm.handleJoinClick}
            className="mc-btn w-full bg-[#5865F2] text-white animate-glow-pulse"
          >
            🌹 Dołącz na serwer
          </button>

          <p className="text-sm text-muted-foreground text-center">
            Po dołączeniu wróć i zaloguj się ponownie.
          </p>
        </div>
      </section>

      <ConfirmDialog
        open={vm.open}
        onConfirm={vm.handleConfirm}
        onCancel={vm.handleCancel}
        discordInvite={DISCORD_INVITE}
      />
    </main>
  )
}