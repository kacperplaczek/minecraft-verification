import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID!,
      clientSecret: process.env.AUTH_DISCORD_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile || !account) return false;

      try {
        const res = await fetch(
          `https://discord.com/api/v10/guilds/${process.env.DISCORD_SERVER_ID}/members/${(profile as any).id}`,
          {
            headers: {
              Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            },
          }
        );

        if (!res.ok) {
          // Nie ma na serwerze — przekieruj na /without-dc
          return "/without-dc";
        }

        return true;
      } catch {
        return "/without-dc";
      }
    },
    jwt({ token, account, profile }) {
      if (account?.access_token) token.accessToken = account.access_token;
      if (profile) {
        token.discordId = (profile as any).id;
        token.discordUsername = (profile as any).username;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.discordId = token.discordId as string;
        session.user.discordUsername = token.discordUsername as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
});