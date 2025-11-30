import { RegisterForm } from "@/ui/features/auth";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="relative z-10">
        <RegisterForm />
      </div>
    </div>
  );
}
