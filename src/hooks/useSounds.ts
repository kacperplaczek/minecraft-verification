import { useCallback, useEffect, useRef } from "react";

type SoundName = "click" | "success" | "error" | "type" | "open" | "level";

/**
 * Tiny Web Audio synth — generates retro 8-bit-ish blips without any assets.
 */
export function useSounds(enabled = true) {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!enabled) return null;
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctx) return null;
      ctxRef.current = new Ctx();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, [enabled]);

  const tone = useCallback(
    (freq: number, duration = 0.12, type: OscillatorType = "square", gain = 0.06, delay = 0) => {
      const ctx = getCtx();
      if (!ctx) return;
      const t0 = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(gain, t0 + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
      osc.connect(g).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + duration + 0.02);
    },
    [getCtx]
  );

  const play = useCallback(
    (name: SoundName) => {
      switch (name) {
        case "click":
          tone(520, 0.06, "square", 0.05);
          break;
        case "type":
          tone(880, 0.03, "square", 0.025);
          break;
        case "open":
          tone(330, 0.08, "triangle", 0.05);
          tone(660, 0.1, "triangle", 0.05, 0.06);
          break;
        case "success":
          tone(523, 0.1, "square", 0.06); // C
          tone(659, 0.1, "square", 0.06, 0.1); // E
          tone(784, 0.18, "square", 0.06, 0.2); // G
          tone(1047, 0.25, "triangle", 0.07, 0.32); // C up
          break;
        case "level":
          tone(660, 0.08, "square", 0.05);
          tone(880, 0.08, "square", 0.05, 0.08);
          tone(1175, 0.14, "square", 0.06, 0.16);
          break;
        case "error":
          tone(220, 0.12, "sawtooth", 0.06);
          tone(180, 0.18, "sawtooth", 0.07, 0.1);
          break;
      }
    },
    [tone]
  );

  // Unlock audio on first user gesture
  useEffect(() => {
    const unlock = () => getCtx();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [getCtx]);

  return { play };
}