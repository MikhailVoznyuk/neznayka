"use client"

import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Rubik_Mono_One } from "next/font/google";
import "./globals.css";
import modalContext from "./modalContext";

import Link from "next/link";
import ModalWindow from "@/components/modalWindow";
import modalWindowContext from "./modalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const RubicMonoOne = Rubik_Mono_One({
  weight: '400',
  subsets: ['cyrillic']
})

export default function RootLayout({ children }) {

  const [modalWindowState, setModalWindowState] = React.useState({
    state: false,
    scrollTop: 0,
    backgoundContainerNeeded: true
  });

  console.log(modalWindowState)
  return (
    <html lang="en">
      <head>
        <title>Выживай-ка</title>
        <meta description="true" content="Обучающая игра"></meta>
      </head>
      
        <body>
          <div className="pageContentWrapper"> 
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
            <modalContext.Provider value={{
            state: false,
            scrollTop: 0,
            backgoundContainerNeeded: true,
            setState: setModalWindowState
            }}>
              {children}
            </modalContext.Provider>
            <ModalWindow windowState={modalWindowState.state} windowContent={modalWindowState.windowContent}></ModalWindow>
          </div>
          
         
          
        </body>
      
      
    </html>
  );
}
