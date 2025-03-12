import React from "react";
import styles from "./components.module.css"
import modalWindowContext from "@/app/modalContext";
import { UpdateWindowState } from "@/app/modalContext";
export default function ModalWindow({windowState, backgroundContainerColor=null, children})  {
    const [modalWindowState, setModalWindowState] = React.useState(false);
    let windowContainerStyle = {};
    if (windowState !=  modalWindowState) {
        setModalWindowState(windowState);
    }
    if (modalWindowState) {
        windowContainerStyle.transform = "translateY(0)";
    }
    if (backgroundContainerColor) {
        windowContainerStyle.backgroundColor = backgroundContainerColor;
        windowContainerStyle.boxShadow = "0px 0px 4px 2px rgba(0, 0, 0, 0.25)"
    }
    return (
        <div className={styles.modalWindowWrapper} style={modalWindowState ? {opacity: 1, zIndex: 10} : {}}>
            <div className={styles.modalWindowContainer} style={windowContainerStyle}>
                {children}
            </div>
        </div>
    )
}