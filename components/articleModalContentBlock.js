import React  from "react";
import modalWindowContext from "@/app/modalContext";
import { UpdateWindowState } from "@/app/modalContext";
import styles from "./components.module.css"

export default function articleModalContentBlock({pageState, setPageState=null, setModalWindowContent, scrollTop, children}) {
    return (
        <div className={styles.articleModalContentContainer}>
            <div className={styles.modalCloseBtnContainer}>
                <button className={styles.modalCloseBtn} onClick={() => {
                    setPageState(UpdateWindowState({prevContext: pageState, state: false, scrollTop: scrollTop}));
                    setTimeout(
                        () => setModalWindowContent((<div></div>)),
                        500
                    )
                 
                }}>
                    <span className={styles.modalCloseBtnLine} style={{transform: 'rotate(-45deg)'}}></span>
                    <span className={styles.modalCloseBtnLine} style={{transform: 'rotate(45deg)'}}></span>
                </button>
            </div>
            <div className={styles.articleModalContentContainer}>
                {children}
            </div>
        </div>
    )
}