"use client"

import { useState } from "react"
import Link from "next/link"
import type { LoginCardProps } from "./types"

export function LoginCardView({ onLogin, onHover }: LoginCardProps) {
  const [accepted, setAccepted] = useState(false)

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
      <p className="text-sm text-muted-foreground">
        Tylko członkowie serwera <strong>rose.owo</strong> mają dostęp do serwera Minecraft.
      </p>
    </div>
  )
}