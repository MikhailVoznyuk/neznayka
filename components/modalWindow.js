import React from "react";
import styles from "./components.module.css"
import modalWindowContext from "@/app/modalContext";
import { UpdateWindowState } from "@/app/modalContext";
export default function ModalWindow({windowState, backgroundContainerColor=null, containerStyle={}, isArticle=false,  children})  {
    const [modalWindowState, setModalWindowState] = React.useState(false);
    const [windowWidth, setWindowWidth] = React.useState(null);
    React.useEffect(() => {
        setWindowWidth(window.innerWidth);
        addEventListener('resize', () => setWindowWidth(window.innerWidth));
    }, []);

    let windowContainerStyle = containerStyle;
    if (windowState !=  modalWindowState) {
        setModalWindowState(windowState);
    }
    if (modalWindowState) {
        windowContainerStyle.transform = "translateY(0)";
        windowContainerStyle.height = 'fit-content'
    }
    if (backgroundContainerColor) {
        windowContainerStyle.backgroundColor = backgroundContainerColor;
        windowContainerStyle.boxShadow = "0px 0px 4px 2px rgba(0, 0, 0, 0.25)"
    }
    /*if ( isArticle && windowWidth <= 670 ) {
        windowContainerStyle.width = '90vw';
        windowContainerStyle.maxHeight=  'calc(100vh - 180px)'
    }*/

    return (
        <div className={styles.modalWindowWrapper} style={modalWindowState ? {opacity: 1, zIndex: 10} : {}}>
            <div className={styles.modalWindowContainer} style={windowContainerStyle}>
                {children}
            </div>
        </div>
    )
}