export function CheckingCard() {
  return (
    <div className="mc-panel text-center space-y-5 animate-scale-in">
      <div className="text-5xl inline-block animate-spin-slow">⛏️</div>
      <p className="text-2xl">Kopanie w bazie Discord...</p>
      <div className="mc-bar">
        <div className="mc-bar-fill" style={{ width: "100%", animation: "pulse 1.2s ease-in-out infinite" }} />
      </div>
      <p className="mc-font text-mc-rose" style={{ fontSize: "10px" }}>SPRAWDZAM CZŁONKOSTWO ROSE.OWO</p>
    </div>
  )
}