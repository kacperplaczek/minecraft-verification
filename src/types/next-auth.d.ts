import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      discordId: string;
      discordUsername: string;
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    discordId?: string;
    discordUsername?: string;
    accessToken?: string;
  }
}