import type { AddedCardProps } from "./types"

export function AddedCardView({ nick, skinUrl }: AddedCardProps) {
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
  )
}