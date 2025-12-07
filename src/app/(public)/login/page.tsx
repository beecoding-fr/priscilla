import { LoginForm } from "@/ui/features/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[120px]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-size-[60px_60px]" />

      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
