import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t mt-auto bg-muted/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © 2025 SaaS Jeunes Entrepreneurs
          </p>
        </div>
      </div>
    </footer>
  );
}
