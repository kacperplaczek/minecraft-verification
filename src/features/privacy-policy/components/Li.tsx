export function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 items-start" style={{ fontSize: "18px", fontFamily: "VT323, monospace" }}>
      <span className="text-mc-rose mt-0.5 shrink-0">▸</span>
      <span>{children}</span>
    </li>
  )
}