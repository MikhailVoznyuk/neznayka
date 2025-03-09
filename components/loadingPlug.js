import React from "react";
import styles from './components.module.css';
export default function LoadingPlug() {
    let elementsDelayMultiper = 0;
    return (
        <div className={styles.loadingPlugContainer}>
            
            <div className={styles.loadingPlug}>
                <span className={styles.loadingPlugItem} style={{backgroundColor: "#FF8F34", animationDelay: `${(0.1 * elementsDelayMultiper++)}s`}}></span>
                <span className={styles.loadingPlugItem} style={{backgroundColor: "#47B0EE", animationDelay: `${(0.1 * elementsDelayMultiper++)}s`}}></span>
                <span className={styles.loadingPlugItem} style={{backgroundColor: "#4C9B77", animationDelay: `${(0.1 * elementsDelayMultiper++)}s`}}></span>
                <span className={styles.loadingPlugItem} style={{backgroundColor: "#FF6064", animationDelay: `${(0.1 * elementsDelayMultiper++)}s`}}></span>
            </div>
           
        </div>
    )
}