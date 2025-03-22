"use client"

import React, { useEffect } from "react";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import { Rubik_Mono_One } from "next/font/google";
import "./globals.css";
import modalContext from "./modalContext";

import Link from "next/link";
import Image from "next/image";
import ModalWindow from "@/components/modalWindow";
import modalWindowContext from "./modalContext";
import { RubikBold } from "@/components/fonts/rubikMonoOne";

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

  const [modalWindowState, setModalWindowState] = React.useState(React.useContext(modalContext));
  const [scrollPos, setScrollPos] = React.useState(0);
  const [isNavOpened, setIsNavOpened] = React.useState(true);
  React.useEffect(() => {
    window.addEventListener('scroll', (event) => {
      const scrollTop = event.target.scrollingElement.scrollTop;
      if (scrollTop > scrollPos + 60) {
        setIsNavOpened(false);
        setScrollPos(scrollTop);
      } else if (scrollTop < scrollPos - 60) {
        setIsNavOpened(true);
        setScrollPos(scrollTop);
      }
    })
  })


  return (
    <html lang="en">
      <head>
        <title>Выживай-ка</title>
        <meta description="true" content="Обучающая игра"></meta>
      </head>
      
        <body>
          <div className="pageContentWrapper" style={modalWindowState.state ? {position: 'fixed', top: `-${modalWindowState.scrollTop}px`} : {}} id={'top'}> 
            <div className={['headerContainer', RubicMonoOne.className].join(' ')}>
              <header className="primaryHeader" style={isNavOpened ? null : {transform: 'translateY(-100px)'}}>
                <Link href='/' className="logo">
                  <Image src={'/logo.svg'} width={205} height={47} alt=''/>
                </Link>
                  
                  <nav className="primaryNav">
                    <Link href="/#test" onClick={(event) => {
                      const element = document.querySelector('#test');
                      if (element) {
                        event.preventDefault();
                        element.scrollIntoView({behavior: 'smooth'});
                      }
                    }}> 
                      <div className='nav-link-content'>
                        <span>Викторина</span>
                        <Image src='/icons/quiz.svg' width={25} height={25} alt='' style={{top: '1px'}}/>
                      </div>
                      <span className="nav-link-particle"></span>
                      

                    </Link>
                    <Link href="/#categories" onClick={(event) => {
                      const element = document.querySelector('#categories');
                      if (element) {
                        event.preventDefault();
                        element.scrollIntoView({behavior: 'smooth'});
                      }
                    }}>
                      <div className='nav-link-content'>
                        <span>Категории</span>
                        <Image src='/icons/category.svg' width={25} height={25} alt='' style={{top: '3px'}}/>
                      </div>
                      <span className="nav-link-particle"></span>
                    </Link>
                    <Link href="error">
                      <div className='nav-link-content'>
                        <span>О нас</span>
                        <Image src='/icons/about.svg' width={25} height={25} alt=''/>
                      </div>
                      <span className="nav-link-particle"></span>
                    </Link>
                    <Link href="error">
                      <div className='nav-link-content'>
                        <span>Контакты</span>
                        <Image src='/icons/contacts.svg' width={25} height={25} alt='' style={{top: '3px'}}/>
                      </div>
                      <span className="nav-link-particle"></span>
                    </Link>
                  </nav>
              </header>
            </div>
            <modalContext.Provider value={
              Object.assign(modalWindowState, {setState: setModalWindowState})
            }>
              {children}
            </modalContext.Provider>
            <footer className={["primary-footer flex flex-column align-center", RubikBold.className].join(' ')}>
              <div className='primary-footer-content'>
                <nav className={'footer-nav'}>
                  <div>
                    <Link href='/#how-it-works' className='footer-nav-link' onClick={(event) => {
                      const element = document.querySelector('#how-it-works');
                      if (element) {
                        event.preventDefault();
                        element.scrollIntoView({behavior: 'smooth'});
                      }
                    }}>
                      <span className={RubikBold.className}>Учиться</span>
                      <Image src='/icons/arrow_orange.svg' className='footer-nav-link-image' width={14} height={12} alt=''></Image>
                    </Link>
                  </div>
                  <div>
                    <Link href='/error' className='footer-nav-link'>
                      <span className={RubikBold.className}>О нас</span>
                      <Image src='/icons/arrow_orange.svg' className='footer-nav-link-image' width={14} height={12} alt=''></Image>
                    </Link>
                  </div>
                  <div>
                    <Link href='/error' className='footer-nav-link'>
                      <span className={RubikBold.className}>Связаться с нами</span>
                      <Image src='/icons/arrow_orange.svg' className='footer-nav-link-image' width={14} height={12} alt=''></Image>
                    </Link>
                  </div>
                  <div>
                    <Link href='https://fasie.ru/' className='footer-nav-link'>
                      <span className={RubikBold.className}>Фонд содействия инновациям</span>
                      <Image src='/icons/arrow_orange.svg' className='footer-nav-link-image' width={14} height={12} alt=''></Image>
                    </Link>
                  </div>
                  <div>
                    <Link href='#top' className='footer-nav-link' onClick={(event) => {
                      const element = document.querySelector('#top');
                      if (element) {
                        event.preventDefault();
                        element.scrollIntoView({behavior: 'smooth'});
                      }
                    }}>
                      <span className={RubikBold.className}>Наверх</span>
                      <Image src='/icons/arrow_ver_long_white.svg' className='footer-nav-arrow' width={15} height={14} alt='' style={{posiiton: 'relative'}}></Image>
                      <Image src='/icons/arrow_ver_long_orange.svg' className='footer-nav-arrow-hover' width={15} height={14} alt='' style={{posiiton: 'relative'}}></Image>
                    </Link>
                  </div>
                
                </nav>
                <div className={'flex flex-column align-center'} style={{marginBottom: '40px'}}>
                  <Image src='/logo_dark.svg' width={200} height={45} alt=''></Image>
                  <p className={RubikBold.className} style={{color: '#FFF', fontSize: '18px', textAlign: 'center'}}>Выживайка - настольная игра, направленная на обучение детей основам безопасности жизнедятельности в игровой форме.</p>
                </div>
                <div className={'flex flex-column align-start'} style={{marginBottom: '40px'}}>
                  <span className={RubikBold.className} style={{marginBottom: '14px'}}>Создано при поддержке:</span>
                  <Image src={'/foundation.svg'}width={230} height={130} alt=''></Image>
                </div>
              </div>
              <div className='flex justify-center align-center'>
                <span>© Выживай-ка 2025.</span>
              </div>
            </footer>
         
          </div>
         
          
        </body>
      
      
    </html>
  );
}
