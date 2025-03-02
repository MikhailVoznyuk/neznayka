import React from "react";
import styles from "./components.module.css"
export default function ModalWindow({windowState, windowContent})  {
    const [modalWindowState, setModalWindowState] = React.useState(false);
    if (windowState !=  modalWindowState) {
        setModalWindowState(windowState);
    }
    return (
        <div className={styles.modalWindowWrapper} style={modalWindowState ? {opacity: 1, zIndex: 10} : {}}>
            <div className={styles.modalWindowContainer}>
                <div className={styles.modalWindowContent}>
                    {windowContent}
                </div>
            </div>
        </div>
    )
}