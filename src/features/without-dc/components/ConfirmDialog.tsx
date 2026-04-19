import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ExternalLink, ShieldCheck } from "lucide-react"
import type { ConfirmDialogProps } from "../types"

export function ConfirmDialog({ open, onConfirm, onCancel, discordInvite }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="mc-panel border-0 max-w-md">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <ExternalLink className="w-6 h-6 text-mc-rose" />
            <DialogTitle className="mc-font text-mc-rose text-shadow-mc-sm" style={{ fontSize: "12px" }}>
              ZEWNĘTRZNY LINK
            </DialogTitle>
          </div>
          <DialogDescription className="text-lg text-foreground space-y-3">
            <span className="block">
              Za chwilę zostaniesz przeniesiony do{" "}
              <span className="text-accent">Discorda</span> — strony zewnętrznej
              spoza naszej domeny.
            </span>
            <span className="block bg-black/40 p-3 mc-block break-all text-base font-mono text-mc-rose">
              {discordInvite}
            </span>
            <span className="block text-base text-muted-foreground">
              Discord to platforma, której używamy do zarządzania społecznością
              rose.owo — zaproszenia, whitelisty i komunikacji z graczami. Link
              otworzy się w nowej karcie.
            </span>
            <span className="flex items-start gap-2 text-base text-mc-grass pt-1">
              <ShieldCheck className="w-4 h-4 mt-1 shrink-0" />
              <span>To oficjalny link naszego serwera. Nigdy nie podawaj nikomu hasła do konta.</span>
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2 pt-2">
          <button
            onClick={onCancel}
            className="mc-btn bg-muted text-foreground flex-1"
          >
            Anuluj
          </button>
          <button
            onClick={onConfirm}
            className="mc-btn bg-mc-rose text-primary-foreground flex-1"
          >
            ▶ Otwórz Discord
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}