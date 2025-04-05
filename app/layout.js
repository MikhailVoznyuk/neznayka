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
import { UpdateWindowState } from "./modalContext";
import { RubikBold } from "@/components/fonts/rubikMonoOne";
import RubikMonoOne from "@/components/fonts/rubikMonoOne";

import observeElements from "@/lib/contentObserver";

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
  const [windowWidth, setWindowWidth] = React.useState(null);
  const [modalWindowContent, setModalWindowContent] = React.useState(null);
  const [isMobNavOpened, setIsMobNavOpened] = React.useState(
    {
      prevContext: {},
      state: false, 
      scrollTop: 0
    }
  )
  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    })
    window.addEventListener('scroll', (event) => {
      
      const scrollTop = event.target.scrollingElement.scrollTop;
      if (scrollTop > scrollPos + 60) {
        setIsNavOpened(false);
        setScrollPos(scrollTop);
      } else if (scrollTop < scrollPos - 60) {
        setIsNavOpened(true);
        setScrollPos(scrollTop);
      }
    });
    if (modalWindowState.state) {
        setIsNavOpened(false);
    }
    
  })
  React.useEffect(() => {
    
    if (typeof(isMobNavOpened.scrollTop) == 'string' && isMobNavOpened.scrollTop.startsWith('#')) {
      const element = document.querySelector(isMobNavOpened.scrollTop);
      
      if (element) {
        
        element.scrollIntoView({behavior: 'smooth'});
        setIsMobNavOpened({isMobNavOpened, state: false, scrollTop: 0})
      }
    } else {
      if (isMobNavOpened.scrollTop != 0 && isMobNavOpened.state == false) {
        
        window.scroll(0, isMobNavOpened.scrollTop)
        setIsMobNavOpened(Object.assign(isMobNavOpened, {scrollTop: 0}))
      } 
      

    }
    }, 
    [modalWindowState, isMobNavOpened]);
    
  return (
    <html lang="en">
      <head>
        <title>Выживай-ка</title>
        <meta description="true" content="Обучающая игра"></meta>
      </head>
      
        <body>
          <div className="pageContentWrapper" style={modalWindowState.state ? {position: 'fixed', top: `-${modalWindowState.scrollTop}px`} : (isMobNavOpened.state) ? {position: 'fixed', top: `-${isMobNavOpened.scrollTop}px`} : {}} id={'top'}> 
            <div className={['headerContainer', RubicMonoOne.className].join(' ')}>
              {(windowWidth > 1010) ? 
                <header className="primaryHeader" style={Object.assign(isNavOpened ? {} : {transform: 'translateY(-100px)'}, (modalWindowState) ? {zIndex: 11}: {})}>
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
                    <Link href="about">
                      <div className='nav-link-content'>
                        <span>О нас</span>
                        <Image src='/icons/about.svg' width={25} height={25} alt=''/>
                      </div>
                      <span className="nav-link-particle"></span>
                    </Link>
                    <Link href="contacts">
                      <div className='nav-link-content'>
                        <span>Контакты</span>
                        <Image src='/icons/contacts.svg' width={25} height={25} alt='' style={{top: '3px'}}/>
                      </div>
                      <span className="nav-link-particle"></span>
                    </Link>
                  </nav>
                </header> : 
                <header className="primaryHeader" style={Object.assign(isNavOpened ? {} : {transform: 'translateY(-100px)'}, (modalWindowState) ? {zIndex: 11}: {})}>
                  <Link href='/' className="logo">
                    <Image src={'/logo.svg'} width={150} height={40} alt=''/>
                  </Link>
                  <button className={['primary-header-nav-btn-mobile', (isMobNavOpened.state) ? 'active' : ''].join(' ')} onClick={() => {
                      if (!isMobNavOpened.state) {
                        
                        setIsMobNavOpened (
                          {
                            state: true,
                            prevContext: isMobNavOpened,
                            scrollTop: document.documentElement.scrollTop
                          }
                        )
                        setModalWindowContent(
                          (
                            <div className={'nav-container-mob'}>
                              <Link className={'nav-link-mob'} href='/#test' onClick={(event) => 
                                {
                                  const element = document.querySelector('#test');
                                  setIsMobNavOpened (
                                  
                                    {
                                      prevContext: isMobNavOpened,
                                      state: false,
                                      scrollTop: '#test'
                                    }
                                    
                                  )
                                  if (element) {
                                    event.preventDefault();
                                  }
                                }}
                              >
                                <Image style={{top: '-2px'}} src='/icons/quiz.svg' width={27} height={27} alt=''></Image>
                                <span className={RubicMonoOne.className}>Викторина</span>
                              </Link>
                              <Link className={'nav-link-mob'} href='/#categories' onClick={(event) => 
                                {     
                                  const element = document.querySelector('#test');
                                  setIsMobNavOpened (
                                  
                                    {
                                      prevContext: isMobNavOpened,
                                      state: false,
                                      scrollTop: '#categories'
                                    }
                                    
                                  )
                                  
                                  if (element) {
                                    event.preventDefault();
                                    
                                  }
                                }}
                              >
                                <Image style={{top: '0px'}} src='/icons/category.svg' width={23} height={23} alt=''></Image>
                                <span className={RubicMonoOne.className}>Категории</span>
                              </Link>
                              <Link className={'nav-link-mob'} href='/about' onClick={(event) => 
                                {
                                  const element = document.querySelector('#about');
                                  setIsMobNavOpened (
                                  
                                    {
                                      prevContext: isMobNavOpened,
                                      state: false,
                                      scrollTop: '#about'
                                    }
                                    
                                  )
                                  if (element) {
                                    
                                    event.preventDefault();
                                    
                                  }
                                }}
                              >
                                <Image style={{top: '1px'}} src='/icons/about.svg' width={25} height={25} alt=''></Image>
                                <span className={RubicMonoOne.className}>О нас</span>
                              </Link>
                              <Link className={'nav-link-mob'} href='/contacts' onClick={(event) => 
                                {
                                 
                                  const element = document.querySelector('#contacts');
                                  setIsMobNavOpened (
                                  
                                    {
                                      prevContext: isMobNavOpened,
                                      state: false,
                                      scrollTop: '#contacts'
                                    }
                                    
                                  )
                                  if (element) {
                                    event.preventDefault();
                                    
                                  }
                                }}
                              >
                                <Image style={{top: '-0.5px'}} src='/icons/contacts.svg' width={25} height={25} alt=''></Image>
                                <span className={RubicMonoOne.className}>Контакты</span>
                              </Link>
                            </div>
                          )
                        )
                        setIsNavOpened(true)
                      } else {

                        
                        setIsMobNavOpened (
                          {
                            state: false,
                            prevContext: isMobNavOpened,
                            scrollTop: isMobNavOpened.scrollTop
                          }
                        )
                        setModalWindowContent(null);
                        setIsNavOpened(true)
                      }
                      
                 
                  }}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                  
                </header>
              }
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
                    <Link href='/about' className='footer-nav-link'>
                      <span className={RubikBold.className}>О нас</span>
                      <Image src='/icons/arrow_orange.svg' className='footer-nav-link-image' width={14} height={12} alt=''></Image>
                    </Link>
                  </div>
                  <div>
                    <Link href='/contacts' className='footer-nav-link'>
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
            <ModalWindow windowState={isMobNavOpened.state} containerStyle={{position: 'fixed', top: '50px', transform: "translateY(0px)"}}>
              {modalWindowContent}
            </ModalWindow>
          </div>
         
          
        </body>
      
      
    </html>
  );
}
