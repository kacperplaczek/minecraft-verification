import type { NickStatus } from "../types"

export function StatusLine({ status }: { status: NickStatus }) {
  if (status === "idle")
    return <p className="text-base text-muted-foreground">Wpisz nick swojego konta premium.</p>
  if (status === "checking")
    return <p className="text-base text-accent animate-pulse">⏳ Sprawdzam w bazie Mojang...</p>
  if (status === "valid")
    return <p className="text-base text-mc-grass animate-fade-in">✓ Konto premium zweryfikowane!</p>
  return <p className="text-base text-destructive animate-fade-in">✗ Nick nie istnieje lub nie jest premium.</p>
}