import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t mt-auto bg-muted/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Jeunes Entrepreneurs</span>
          </div>
          <div className="flex items-center gap-10 text-sm text-muted-foreground">
            <Link
              href="/about"
              className="hover:text-foreground transition-colors"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="hover:text-foreground transition-colors text-foreground"
            >
              Contact
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Mentions légales
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 SaaS Jeunes Entrepreneurs
          </p>
        </div>
      </div>
    </footer>
  );
}
