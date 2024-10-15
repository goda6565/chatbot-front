import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatBot",
  description: "ChatBotです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="flex flex-col justify-center items-center w-screen h-screen">
        {children}
      </body>
    </html>
  );
}
