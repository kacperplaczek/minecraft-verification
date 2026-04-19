import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "rose.owo - weryfikacja Minecraft",
  description: "Zdobądź dostęp do serwera Minecraft rose.owo poprzez szybką weryfikację Discord! Połącz swoje konto, potwierdź członkostwo na naszym serwerze i dołącz do zabawy już dziś!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}