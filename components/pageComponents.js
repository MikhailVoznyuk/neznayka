import React from "react";
import Image from "next/image";
import styles from './components.module.css';
import AnimationAppearWrapper from "./animationAppearWrapper";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";


export default function TextAnimationColumns({title, text, imageSrc=null, isReversed=false, customAnimationStyle={}}) {
    
    
    return (
        <div className={['flex justify-center align-center mb-100', styles.textAnimationRow].join(' ')} style={(isReversed) ? {flexDirection: 'row-reverse'} : null}>
            
            <AnimationAppearWrapper className={['flex flex-column justify-center', styles.textColumn].join(' ')}>
                <h4 className='text-xl mb-30'>{title}</h4>
                <p>{text}</p>
            </AnimationAppearWrapper>
            <AnimationAppearWrapper className={[`flex justify-center`, styles.animationColumn].join(' ')}>
               <Image width={100} height={100} src={imageSrc} className={styles.animatedImage} alt=''></Image>
            </AnimationAppearWrapper>
        </div>
    )
}

export function ColumnAnimationBlock({textContent, animationSrc, animationStyle}) {
    return (
        <AnimationAppearWrapper className={['flex', 'flex-column', 'align-center', styles.columnAnimationBlock].join(' ')}>
            <div className={[styles.columnBlockAnimation, 'mb-30'].join(' ')} style={animationStyle}>
                <DotLottieReact
                    src={animationSrc}
                    loop
                    autoplay
                />
            </div>
            <p className={styles.columnBlockText}>
                {textContent}
            </p>
        </AnimationAppearWrapper>
    )
}