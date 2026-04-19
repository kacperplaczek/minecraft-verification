export async function checkMinecraftNick(nick: string) {
  const res = await fetch(
    `https://playerdb.co/api/player/minecraft/${encodeURIComponent(nick)}`
  )
  const data = await res.json()
  if (data?.success && data?.data?.player?.id) {
    return { valid: true, uuid: data.data.player.id }
  }
  return { valid: false, uuid: null }
}

export async function addToWhitelist(nick: string) {
  const res = await fetch("/api/whitelist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ minecraftUsername: nick }),
  })
  if (!res.ok) {
    const { error } = await res.json()
    throw new Error(error)
  }
  return true
}