import { useState } from "react"
import { useSounds } from "@/hooks/useSounds"
import { DISCORD_INVITE } from "./model"

export function useWithoutDc() {
  const [open, setOpen] = useState(false)
  const { play } = useSounds(true)

  const handleJoinClick = () => {
    play("open")
    setOpen(true)
  }

  const handleConfirm = () => {
    play("success")
    window.open(DISCORD_INVITE, "_blank", "noopener,noreferrer")
    setOpen(false)
  }

  const handleCancel = () => {
    play("click")
    setOpen(false)
  }

  return {
    open,
    handleJoinClick,
    handleConfirm,
    handleCancel,
  }
}