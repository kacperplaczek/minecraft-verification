import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.discordId) {
    return NextResponse.json({ isMember: false }, { status: 401 });
  }

  try {
    const res = await fetch(
      `https://discord.com/api/v10/guilds/${process.env.DISCORD_SERVER_ID}/members/${session.user.discordId}`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );

    return NextResponse.json({ isMember: res.ok });
  } catch {
    return NextResponse.json({ isMember: false });
  }
}