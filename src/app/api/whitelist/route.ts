import { auth } from "@/auth";
import db from "@/lib/db";
import { Rcon } from "rcon-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.discordId) {
    return NextResponse.json({ error: "Nie zalogowany" }, { status: 401 });
  }

  const { minecraftUsername } = await req.json();

  if (!minecraftUsername?.trim()) {
    return NextResponse.json({ error: "Brak nicku" }, { status: 400 });
  }

  try {
    const rcon = await Rcon.connect({
      host: process.env.RCON_HOST!,
      port: Number(process.env.RCON_PORT) || 25575,
      password: process.env.RCON_PASSWORD!,
    });

    const response = await rcon.send(`whitelist add ${minecraftUsername.trim()}`);
    await rcon.send(`whitelist reload`);
    await rcon.end();

    if (!response.includes("Added") && !response.includes("already")) {
      return NextResponse.json({ error: "RCON: " + response }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: "Błąd połączenia RCON" }, { status: 500 });
  }

  db.prepare(`
    INSERT INTO whitelist (discord_id, discord_username, minecraft_username)
    VALUES (?, ?, ?)
    ON CONFLICT(discord_id) DO UPDATE SET
      minecraft_username = excluded.minecraft_username,
      discord_username = excluded.discord_username
  `).run(
    session.user.discordId,
    session.user.discordUsername,
    minecraftUsername.trim()
  );

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const session = await auth();

  if (!session?.user?.discordId) {
    return NextResponse.json({ error: "Nie zalogowany" }, { status: 401 });
  }

  const row = db.prepare(`
    SELECT minecraft_username FROM whitelist WHERE discord_id = ?
  `).get(session.user.discordId) as { minecraft_username: string } | undefined;

  return NextResponse.json({ minecraftUsername: row?.minecraft_username ?? null });
}