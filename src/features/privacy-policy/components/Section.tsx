export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="mc-font text-mc-rose text-shadow-mc-sm" style={{ fontSize: "11px" }}>
        {title}
      </h2>
      <div className="text-foreground leading-relaxed space-y-2" style={{ fontSize: "18px", fontFamily: "VT323, monospace" }}>
        {children}
      </div>
    </div>
  )
}