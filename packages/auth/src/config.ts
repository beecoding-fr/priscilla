import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@priscilla/database";

// Types
export type UserRole = "ADMIN" | "JE" | "ES";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string | null;
      lastName: string | null;
      role: UserRole;
      image?: string | null;
    };
  }

  interface User {
    role: UserRole;
    firstName?: string | null;
    lastName?: string | null;
  }
}

interface ExtendedJWT extends JWT {
  id: string;
  role: UserRole;
  firstName: string | null;
  lastName: string | null;
}

/**
 * Récupère le domaine parent pour les cookies partagés
 * En production: .monsite.fr
 * En développement: localhost (pas de partage)
 */
function getCookieDomain(): string | undefined {
  const domain = process.env.AUTH_COOKIE_DOMAIN;
  if (domain) return domain;

  // En production, le domaine doit être configuré via env
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "AUTH_COOKIE_DOMAIN non configuré - les cookies ne seront pas partagés entre sous-domaines"
    );
  }

  return undefined;
}

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-authjs.session-token"
          : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: getCookieDomain(),
      },
    },
    callbackUrl: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-authjs.callback-url"
          : "authjs.callback-url",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: getCookieDomain(),
      },
    },
    csrfToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Host-authjs.csrf-token"
          : "authjs.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role as UserRole,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        (token as ExtendedJWT).role = user.role;
        (token as ExtendedJWT).firstName = user.firstName ?? null;
        (token as ExtendedJWT).lastName = user.lastName ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = (token as ExtendedJWT).role;
        session.user.firstName = (token as ExtendedJWT).firstName;
        session.user.lastName = (token as ExtendedJWT).lastName;
      }
      return session;
    },
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;

      // Routes publiques
      const publicRoutes = [
        "/",
        "/login",
        "/register",
        "/about",
        "/contact",
        "/api/auth",
      ];
      const isPublicRoute = publicRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
      );

      if (isPublicRoute) {
        return true;
      }

      // Routes protégées
      if (!isLoggedIn) {
        return false;
      }

      // Routes admin
      if (
        pathname.startsWith("/admin") ||
        pathname.startsWith("/dashboard/admin")
      ) {
        return auth?.user?.role === "ADMIN";
      }

      return true;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
