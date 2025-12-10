import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/core/infrastructure/prisma";
import type { UserRole } from "@/core/domain";

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
  }
}

interface ExtendedJWT extends JWT {
  id: string;
  role: UserRole;
  firstName: string | null;
  lastName: string | null;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
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

        console.log("User authenticated:", user);

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
        (token as ExtendedJWT).firstName =
          (user as { firstName?: string | null }).firstName ?? null;
        (token as ExtendedJWT).lastName =
          (user as { lastName?: string | null }).lastName ?? null;
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
  },
});
