"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";

import RubikMonoOne from "@/components/fonts/rubikMonoOne";
import { RubikBold } from "@/components/fonts/rubikMonoOne";

import styles from './page.module.css'

import AnimationAppearWrapper from "@/components/animationAppearWrapper";
import TextAnimationColumns from "@/components/pageComponents";
import { ColumnAnimationBlock } from "@/components/pageComponents";


export default function Page() {
    const [windowWidth, setWindowWidth] = React.useState(null);
    React.useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth))
    })
    let animationStyles;
    if (windowWidth >= 980) {
        animationStyles= [{left: '140px'}, {width: '500px', right: '130px'}, {width: '380px', height: '340px'}]
    } else if (windowWidth >= 740) {
        animationStyles = [
            {width: '320px', left: '30px'}, 
            {width: '300px', height: '80%', right: '90px'}, 
            {width: '310px', height: '280px',}]
    } else {
        animationStyles = [
            {width: '320px', }, 
            {width: '300px', }, 
            {width: '300px', height: '280px'}]
    }
    return (
        <main className={RubikBold.className}>

             <div className={['container justify-center align-center flex-column', styles.textAnimationRowTitle].join(' ')}>
                <AnimationAppearWrapper className="mb-20">
                    <Image src="icons/logo.svg" width={240} height={96} alt="logo"></Image>
                </AnimationAppearWrapper>
                <AnimationAppearWrapper className={['text-lg', RubikBold.className].join(' ')}>
                    <p className={['column-xl', 'text-center'].join(' ')}>Знакомим вас с уникальной развивающей настольной игрой "ОБЖШКА", которая превратит важные уроки безопасности в увлекательное приключение для всей семьи! Теперь правила поведения в опасных ситуациях легко запомнятся детям в процессе весёлой игры.</p>
                </AnimationAppearWrapper>
            </div>
            <div className={['container justify-center align-center flex-column', styles.textSection].join(' ')}>
                <AnimationAppearWrapper>
                    <h3>Что такое "ОБЖШКА"?</h3>
                </AnimationAppearWrapper>
                <AnimationAppearWrapper>
                    <p>"ОБЖШКА" – это яркая настольная игра, созданная педагогами и экспертами по детской безопасности. Она в простой и доступной форме учит детей основам безопасности жизнедеятельности (ОБЖ), а также помогает родителям в лёгком диалоге обсудить с ребёнком жизненно важные правила.</p>
                </AnimationAppearWrapper>
            </div>
            <div className={['container justify-center align-center flex-column', styles.textSection].join(' ')}>
                <AnimationAppearWrapper>
                    <h3>Как играть?</h3>
                </AnimationAppearWrapper>
                <AnimationAppearWrapper>
                    <p>"ОБЖШКА" – это яркая настольная игра, созданная педагогами и экспертами по детской безопасности. Она в простой и доступной форме учит детей основам безопасности жизнедеятельности (ОБЖ), а также помогает родителям в лёгком диалоге обсудить с ребёнком жизненно важные правила.</p>
                </AnimationAppearWrapper>
            </div>
            <div className={['container justify-center text-md ', styles.benefits].join(' ')}>
                <TextAnimationColumns  
                    title='1. Подготовка:'
                    text='Разложите красочное поле и колоду карточек с вопросами, и выберите свою фишку!'
                    imageSrc={'/icons/board-game.svg'}
                    isReversed={false}
                    customAnimationStyle={animationStyles[0]}
                />
                <TextAnimationColumns 
                    title='2. Ход игры:'
                    text='Бросайте кубики, двигайтесь по полю и отвечайте на вопросы и получайте баллы.'
                    imageSrc={'/icons/finish.svg'}
                    isReversed={true}
                    customAnimationStyle={animationStyles[1]}
                />
                <TextAnimationColumns  
                    title='3. Вопросы и ответы:'
                    text='Соперник зачитывает вам вопрос из карточки. Ваша задача – дать верный ответ! Если ответ правильный вы забираете карточку себе, но если вы не ответили, то карточка уходит игроку справа от вас.'
                    imageSrc={'/icons/question.svg'}
                    isReversed={false}
                    customAnimationStyle={animationStyles[2]}
                />
                <TextAnimationColumns
                    title='4. Победа:'
                    text='За каждый правильный ответ игрок получает карточку. Побеждает тот, кто не только дошёл до финиша, но и набрал наибольшее количество очков!'
                    imageSrc={'/icons/trophy.svg'}
                    isReversed={true}
                    customAnimationStyle={animationStyles[2]}
                />
           
               
           
            
                
                
            </div>
            <AnimationAppearWrapper className={`container justify-center text-md ${(windowWidth < 500 ? 'mb-30' : '')}`} style={{marginTop: '-40px'}}>
                <h2 className={'mb-50 text-xxl text-center'}>Почему "ОБЖШКА" должна быть в каждой семье?</h2>
                <div className={['flex justify-center', styles.columnsContainer].join(' ')}>
                    <ColumnAnimationBlock
                        textContent={'Скучные инструкции остались в прошлом! Дети легко и с интересом запоминают, как действовать при пожаре, как вести себя с незнакомцами, как оказать первую помощь и многое другое.'}
                        animationSrc={'/animation/success.json'}     
                        animationStyle={{width: '240px', height: '120px'}}  
                    />
                    <ColumnAnimationBlock
                        textContent={'Простые правила понятны детям от 5-6 лет, а актуальные темы будут интересны и подросткам, и взрослым. Это прекрасный повод провести время вместе с пользой.'}
                        animationSrc={'/animation/brain.json'}     
                        animationStyle={{width: '300px', height: '120px'}}  
                    />
                    <ColumnAnimationBlock
                        textContent={'Игра развивает эрудицию, логическое мышление, память и умение принимать решения.'}
                        animationSrc={'/animation/motivation.json'}
                        animationStyle={{width: '300px', height: '120px'}}
                    />
                    <ColumnAnimationBlock
                        textContent={'Мы позаботились о том, чтобы игровое поле, карточки и фишки были сделаны из прочных и безопасных материалов, способных выдержать множество захватывающих партий.'}
                        animationSrc={'/animation/brain.json'}
                        animationStyle={{width: '300px', height: '120px'}}
                    />
                </div>
            </AnimationAppearWrapper >
            <div className={`container justify-center ${(windowWidth < 500 ? 'mb-30' : '')}`}>
                <p className="text-lg text-center" style={(windowWidth < 500 ? {fontSize: '22px'} : null)}>У вас есть какие-либо вопросы? <Link className={styles.inlineLink} href='/contacts'>Свяжитесь с нами</Link>!</p>
            </div>
        
        </main>
       
    )
}