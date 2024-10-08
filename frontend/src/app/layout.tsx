import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import NavBar from "./Navbar";
import "./globals.css";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uninter Admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoCondensed.className}>
        <header>
          <NavBar />
        </header>
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
