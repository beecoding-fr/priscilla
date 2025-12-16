import { auth } from "@priscilla/auth";
import { redirect } from "next/navigation";

export default async function AppHomePage() {
  const session = await auth();

  if (!session) {
    // Rediriger vers le site vitrine pour se connecter
    const wwwUrl = process.env.NEXT_PUBLIC_WWW_URL || "http://localhost:3000";
    redirect(`${wwwUrl}/login`);
  }

  // Rediriger vers le dashboard
  redirect("/dashboard");
}
