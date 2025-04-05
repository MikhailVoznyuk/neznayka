import React from "react";
import { useInView } from "react-intersection-observer";

import styles from './components.module.css'

export default function AnimationAppearWrapper({className='', id=null, style={}, children}) {
    const [ref, inView] = useInView({triggerOnce: true});
    const animationWrapperStyle = Object.assign({}, style, {transform: inView ? 'translateY(0px)' : 'translateY(100px)', opacity: inView ? 1: 0, transition: '0.8s ease'});
    return (
        <div ref={ref} id={id ? id : null} className={className} style={animationWrapperStyle}>
            {children}
        </div>
    )
}
