import { useEffect, useRef, useState } from "react"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { useSounds } from "@/hooks/useSounds"
import { checkMinecraftNick, addToWhitelist } from "./services/whitelist.service"
import type { Step, NickStatus } from "./types"

export const SERVER_NAME = "rose.owo"

export function useWhitelistPage() {
  const { status } = useSession()
  const [step, setStep] = useState<Step>("login")
  const [nick, setNick] = useState("")
  const [nickStatus, setNickStatus] = useState<NickStatus>("idle")
  const [skinUrl, setSkinUrl] = useState<string | null>(null)
  const [soundOn, setSoundOn] = useState(true)
  const debounce = useRef<number | null>(null)
  const { play } = useSounds(soundOn)

  useEffect(() => {
    if (status !== "authenticated") return
    play("open")
    setTimeout(() => {
      play("level")
      setStep("form")
    }, 1600)
  }, [status])

  useEffect(() => {
    if (step !== "form") return
    setNickStatus("idle")
    setSkinUrl(null)
    if (!nick || nick.length < 3) return
    if (debounce.current) window.clearTimeout(debounce.current)
    setNickStatus("checking")
    debounce.current = window.setTimeout(async () => {
      try {
        const { valid, uuid } = await checkMinecraftNick(nick)
        if (valid && uuid) {
          setNickStatus("valid")
          setSkinUrl(`https://mc-heads.net/avatar/${uuid}/128`)
          play("level")
        } else {
          setNickStatus("invalid")
          play("error")
        }
      } catch {
        setNickStatus("invalid")
        play("error")
      }
    }, 600)
    return () => {
      if (debounce.current) window.clearTimeout(debounce.current)
    }
  }, [nick, step])

  const handleLogin = async () => {
    play("click")
    await signIn("discord", { callbackUrl: "/" })
  }

  const handleSubmit = async () => {
    try {
      await addToWhitelist(nick)
      play("success")
      toast.success(`${nick} dodany do whitelisty!`, {
        description: `Witaj na ${SERVER_NAME} 🌹`,
      })
      setStep("added")
    } catch (e: any) {
      play("error")
      toast.error("Błąd: " + e.message)
    }
  }

  const handleNickChange = (v: string) => {
    if (v.length > nick.length) play("type")
    setNick(v)
  }

  const toggleSound = () => {
    setSoundOn((s) => !s)
    play("click")
  }

  return {
    step,
    nick,
    nickStatus,
    skinUrl,
    soundOn,
    handleLogin,
    handleSubmit,
    handleNickChange,
    toggleSound,
    play,
  }
}