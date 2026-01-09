// lib/auth.ts
import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (!account) return false;
      return account.provider === "github" && account.providerAccountId === process.env.ALLOWED_GITHUB_ID;
    },
  },
  session: {
    strategy: "jwt",
  },
};
