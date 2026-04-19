"use client"

import { signOut, useSession } from "next-auth/react"

export function LogoutButton() {
  const { data: session } = useSession()
  if (!session) return null

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="fixed bottom-4 right-4 z-20 mc-btn bg-card text-foreground flex items-center gap-3"
      style={{ fontSize: "10px" }}
    >
      {session.user?.image && (
        <img
          src={session.user.image}
          alt="avatar"
          width={24}
          height={24}
          className="mc-block"
          style={{ imageRendering: "pixelated", width: 24, height: 24 }}
        />
      )}
      WYLOGUJ SIĘ
    </button>
  )
}