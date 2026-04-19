import type { NickStatus } from "../../types"

export type FormCardProps = {
  nick: string
  setNick: (v: string) => void
  nickStatus: NickStatus
  skinUrl: string | null
  onSubmit: () => void
}