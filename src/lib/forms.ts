/**
 * Form submission transport.
 *
 * The old WordPress site used WPForms, which only accepts submissions through
 * wp-admin/admin-ajax.php with a per-form anti-spam token — there is no public API the
 * React app can call. Submissions therefore go to VITE_FORMS_ENDPOINT, an HTTPS endpoint
 * the clinic hosts (see docs/deployment.md for the contract and example implementations).
 *
 * Nothing is stored in the browser. If the endpoint is not configured the form reports
 * that honestly instead of pretending to succeed.
 */
export type FormKind = "consultation" | "feedback";

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "network" | "server"; message: string };

const endpoint = (import.meta.env.VITE_FORMS_ENDPOINT as string | undefined)?.trim();

export const formsConfigured = Boolean(endpoint);

export async function submitForm(kind: FormKind, payload: Record<string, unknown>): Promise<SubmitResult> {
  if (!endpoint) {
    return {
      ok: false,
      reason: "not-configured",
      message: "Online submission is not enabled on this site yet. Please call or WhatsApp us and we will book you in right away.",
    };
  }
  const body = JSON.stringify({ form: kind, submittedAt: new Date().toISOString(), page: typeof location !== "undefined" ? location.pathname : undefined, ...payload });
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body, signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) {
      let message = `The server could not accept your submission (status ${res.status}). Please try again or call us.`;
      try {
        const data = (await res.json()) as { message?: string };
        if (data?.message) message = data.message;
      } catch {
        /* ignore non-JSON bodies */
      }
      return { ok: false, reason: "server", message };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: "network", message: "We couldn't reach the server. Please check your connection and try again, or call us." };
  }
}
