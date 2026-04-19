import { StatusLine } from "../StatusLine"
import type { FormCardProps } from "./types"

export function FormCardView({ nick, setNick, nickStatus, skinUrl, onSubmit }: FormCardProps) {
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
                  nickStatus === "valid" ? "100%" :
                  nickStatus === "checking" ? "60%" :
                  nickStatus === "invalid" ? "100%" :
                  `${Math.min(nick.length * 6, 40)}%`,
                background:
                  nickStatus === "invalid" ? "hsl(var(--destructive))" :
                  nickStatus === "valid" ? "linear-gradient(90deg, hsl(var(--mc-grass)), hsl(var(--mc-diamond)))" :
                  undefined,
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
  )
}