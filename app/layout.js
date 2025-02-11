import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Link from "next/link"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Незнайка",
  description: "Обучающая игра",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="primaryHeader">
          <div className="logo">
            <h1>Незнайка</h1>
          </div>
            
            <nav className="primaryNav">
              <Link href="/">Главная</Link>
              <Link href="error">Викорина</Link>
              <Link href="error">Игра</Link>
            </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
