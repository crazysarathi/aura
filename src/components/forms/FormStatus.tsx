import { CheckCircle2, MessageCircle, Phone, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import type { SubmitResult } from "@/lib/forms";

/** Success / failure panel shown after a submission attempt. */
export function FormStatus({ result, onReset, successTitle = "Thank you — we've received your request", successText = "Our team will contact you shortly to confirm your appointment." }: { result: SubmitResult; onReset: () => void; successTitle?: string; successText?: string }) {
  if (result.ok) {
    return (
      <div role="status" className="rounded-xl border border-success/30 bg-success/5 p-6">
        <div className="flex gap-3">
          <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-success" aria-hidden="true" />
          <div>
            <h3 className="font-sans text-lg font-semibold text-indigo-900">{successTitle}</h3>
            <p className="mt-1 text-sm text-ink-muted">{successText}</p>
            <Button variant="link" className="mt-3" onClick={onReset}>
              Send another
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div role="alert" className="rounded-xl border border-copper-400/50 bg-copper-50 p-6">
      <div className="flex gap-3">
        <TriangleAlert className="mt-0.5 size-6 shrink-0 text-copper-700" aria-hidden="true" />
        <div className="flex-1">
          <h3 className="font-sans text-lg font-semibold text-indigo-900">{result.reason === "not-configured" ? "Online booking isn't available right now" : "We couldn't send your request"}</h3>
          <p className="mt-1 text-sm text-ink-muted">{result.message}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild size="sm">
              <a href={`tel:${site.phones[0].tel}`}>
                <Phone /> Call {site.phones[0].display}
              </a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> WhatsApp us
              </a>
            </Button>
            {result.reason !== "not-configured" && (
              <Button size="sm" variant="ghost" onClick={onReset}>
                Try again
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
