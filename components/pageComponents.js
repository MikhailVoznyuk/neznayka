import React from "react";
import Image from "next/image";
import styles from './components.module.css';

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function TextAnimationColumns({title, text, AnimationSrc=null, isReversed=false, customAnimationStyle={}}) {
    
    
    return (
        <div className={['flex justify-between align-center mb-100', styles.textAnimationRow].join(' ')} style={(isReversed) ? {flexDirection: 'row-reverse'} : null}>
            
            <div className={['flex flex-column justify-center', styles.textColumn].join(' ')}>
                <h4 className='text-title-md mb-30'>{title}</h4>
                <p>{text}</p>
            </div>
            <div className={['flex justify-end', styles.animationColumn].join(' ')} style={customAnimationStyle}>
               <DotLottieReact
                    src={AnimationSrc}
                    loop
                    autoplay
                />
            </div>
        </div>
    )
}

export function ColumnAnimationBlock({textContent, animationSrc, animationStyle}) {
    return (
        <div className={['flex', 'flex-column', 'align-center', styles.columnAnimationBlock].join(' ')}>
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
        </div>
    )
}