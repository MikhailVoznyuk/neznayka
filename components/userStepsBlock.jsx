import React from "react";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "./components.module.css";
import { RubikBold } from "./fonts/rubikMonoOne";
import RubikMonoOne from "./fonts/rubikMonoOne";


export default function StepsBlock({steps}) {
    return (
        <div className={styles.stepsBlock}>
            {steps.map((step) => {
                return (
                   
                    <div key={step.id} className={[styles.stepBlock, RubikBold.className].join(' ')}>
                        <div className={styles.stepBlockColumn} style={{width: '70%'}}>
                            <div className={[styles.stepBlockTitle, RubikMonoOne.className].join(' ')}>
                                <h4>{step.title}</h4>
                            </div> 
                            <div className={styles.stepBlockDescription}>
                                <p>{step.description}</p>
                            </div>
                        </div>
                        <div className={[styles.stepBlockColumn, 'justify-center'].join(' ')} style={{width: '30%'}}>
                            <div className={styles.lottieAnimationWrapper} style={step.animationStyle}>
                                <DotLottieReact
                                    src={step.animation}
                                    loop
                                    autoplay
                                />
                            </div>
                        </div>
                        <div className={styles.stepBlockParticle}></div>
                        <span className={styles.stepBlockNumber}>{step.id + 1}</span>
                       
                    </div>
                    
                )
            })}
             <Image className={styles.scoreLine} src='/lines_dashed_blue.svg' width={10} height={560} alt=''></Image>
        </div>
    )
}