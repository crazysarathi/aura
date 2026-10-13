import { Link } from "react-router";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

/** Appointment / contact call-to-action used at the end of most pages. */
export function CtaBand({ title = "Ready to begin your journey?", text = "Book a consultation with our specialists. Call, message us on WhatsApp, or send your details and we'll get back to you." }: { title?: string; text?: string }) {
  return (
    <section className="bg-indigo-900 text-white">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-12 sm:gap-8 sm:py-14 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="eyebrow text-copper-400">Appointments</p>
          <h2 className="mt-2 text-[1.75rem] leading-tight text-white sm:mt-3 sm:text-4xl">{title}</h2>
          <p className="mt-3 text-[15px] text-white/80 sm:mt-4 sm:text-base">{text}</p>
        </div>
        <div className="grid w-full gap-3 sm:flex sm:w-auto sm:flex-wrap">
          <Button asChild variant="accent" size="lg">
            <Link to="/consult/">Book a consultation</Link>
          </Button>
          <Button asChild variant="light" size="lg">
            <a href={`tel:${site.phones[0].tel}`}>
              <Phone /> {site.phones[0].display}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:border-white hover:bg-white/10">
            <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
