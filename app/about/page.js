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
                    <Image src="/logo.svg" width={300} height={60} alt="logo"></Image>
                </AnimationAppearWrapper>
                <AnimationAppearWrapper className={['text-lg', RubikBold.className].join(' ')}>
                    <p className={['column-md', 'text-center'].join(' ')}>Платформа для изучения основ безопасности жизнедеятельности в игровой форме, как для детей, так и взрослых.</p>
                </AnimationAppearWrapper>
            </div>
            <div className={['container justify-center text-md ', styles.benefits].join(' ')}>
                <TextAnimationColumns  
                    title='Цель'
                    text='Система направлена на развитие у детей и закрепление у взрослых основ безопасности, а также снижение количества бытовых пожаров, детского травматизма и смертности на дорогах.'
                    AnimationSrc={'/animation/fire-extinguisher.json'}
                    isReversed={false}
                    customAnimationStyle={animationStyles[0]}
                />
                <TextAnimationColumns 
                    title='Почему это важно?'
                    text='В настоящий момент наблюдается отсутствие базовых знаний общей безопасности у людей старше 18 лет, поэтому необходимо улучшить образовательный процесс в области безопасности жизнедеятельности у детей, что подтверждается ростом показателей бытового травматизма, пожаров и увеличением нарушений правил  ПДД.'
                    AnimationSrc={'/animation/band-aid.json'}
                    isReversed={true}
                    customAnimationStyle={animationStyles[1]}
                />
                <TextAnimationColumns  
                    title='Наши преимущества'
                    text='Все имеющиеся на рынке продукты/товары сводятся к детским загадкам и ребусам дошкольного возраста, что приводит к одноразовому использованию продукта.
                            В нашей игре предусмотрена нелинейность развития ситуации. Игровой процесс вовлечет в себя не только детей, но и взрослых.'
                    AnimationSrc={'/animation/talk.json'}
                    isReversed={false}
                    customAnimationStyle={animationStyles[2]}
                />
           
               
           
            
                
                
            </div>
            <AnimationAppearWrapper className={`container justify-center text-md ${(windowWidth < 500 ? 'mb-30' : '')}`} style={{marginTop: '-40px'}}>
                <h2 className={'mb-50 text-xxl text-center'}>Наша платформа поможет:</h2>
                <div className={['flex justify-center', styles.columnsContainer].join(' ')}>
                    <ColumnAnimationBlock
                        textContent={'Сделать процесс обучения максимально интересным и веселым, как для детей, так и для взрослых.'}       
                        animationSrc={'/animation/success.json'}     
                        animationStyle={{width: '240px', height: '120px'}}  
                    />
                    <ColumnAnimationBlock
                        textContent={'Привить правильные алгоритмы действия в различных жизненных ситуациях, содержащих потенциальную угрозу для их жизни и здоровья.'}       
                        animationSrc={'/animation/motivation.json'}     
                        animationStyle={{width: '300px', height: '120px'}}  
                    />
                    <ColumnAnimationBlock
                        textContent={'Актуализировать забытые знания из школьного курса ОБЖ.'}       
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