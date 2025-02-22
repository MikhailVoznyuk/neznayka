import { Geist, Geist_Mono } from "next/font/google";
import { Rubik_Mono_One } from "next/font/google";
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

const RubicMonoOne = Rubik_Mono_One({
  weight: '400',
  subsets: ['cyrillic']
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={['headerContainer', RubicMonoOne.className].join(' ')}>
          <header className="primaryHeader">
            <div className="logo">
              <h1>Выживай-ка</h1>
            </div>
              
              <nav className="primaryNav">
                <Link href="/">Главная</Link>
                <Link href="error">Викторина</Link>
                <Link href="error">О нас</Link>
              </nav>
          </header>
        </div>
        
        {children}
      </body>
    </html>
  );
}
