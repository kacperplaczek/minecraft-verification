"use client"

import Image from "next/image"
import { Volume2, VolumeX } from "lucide-react"
import { PetalsRain } from "@/components/PetalsRain"
import { LoginCard } from "./components/LoginCard"
import { LogoutButton } from "./components/LogoutButton"
import { CheckingCard } from "./components/CheckingCard"
import { FormCard } from "./components/FormCard"
import { AddedCard } from "./components/AddedCard"
import { useWhitelistPage, SERVER_NAME } from "./viewmodel"

export function WhitelistPageView() {
  const vm = useWhitelistPage()

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
        onClick={vm.toggleSound}
        className="absolute top-4 right-4 z-20 mc-chip hover:brightness-125 transition"
        aria-label="Przełącz dźwięk"
      >
        {vm.soundOn ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
        {vm.soundOn ? "SOUND ON" : "MUTED"}
      </button>

      <section className="relative z-10 w-full max-w-xl animate-fade-in">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image src="/img/rose.png" alt="" width={48} height={48} className="w-12 h-12 animate-float" style={{ imageRendering: "pixelated" }} />
            <h1 className="mc-font text-2xl md:text-4xl text-mc-rose text-shadow-mc">ROSE.OWO</h1>
            <Image src="/img/rose.png" alt="" width={48} height={48} className="w-12 h-12 animate-float" style={{ imageRendering: "pixelated", animationDelay: "1.5s" }} />
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="mc-chip text-accent">⛏ MINECRAFT</span>
            <span className="mc-chip text-mc-rose">🌹 WHITELIST</span>
          </div>
          <div className="pixel-divider w-48 mx-auto" />
        </header>

        {vm.step === "login" && (
          <LoginCard onLogin={vm.handleLogin} onHover={() => vm.play("type")} />
        )}
        {vm.step === "checking-server" && <CheckingCard />}
        {vm.step === "form" && (
          <FormCard
            nick={vm.nick}
            setNick={vm.handleNickChange}
            nickStatus={vm.nickStatus}
            skinUrl={vm.skinUrl}
            onSubmit={vm.handleSubmit}
          />
        )}
        {vm.step === "added" && (
          <AddedCard nick={vm.nick} skinUrl={vm.skinUrl} />
        )}

        <p className="text-center text-muted-foreground mt-8 mc-font" style={{ fontSize: "10px" }}>
          v1.0 · {SERVER_NAME}
        </p>
      </section>
    </main>
  )
}