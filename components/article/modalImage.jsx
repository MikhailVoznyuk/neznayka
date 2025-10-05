import {useState} from "react";
import Image from "next/image";
import styles from "./component.module.css"
import Link from "next/link";

export default function ModalImage(imageSrc) {
    const [isOpened, setIsOpened] = useState(false);
    return (
        <div className={styles.modalImageContainer}>
            <div className={styles.modalImageContent} style={{
                position: (isOpened ? 'fixed' : 'absolute'),
                top: (isOpened ? '0' : null),
                left: (isOpened ? '0' : null),
                height: (isOpened ? '96vh' : '64vh'),
                width: (isOpened ? 'calc(99vh * 1.53)' : 'calc(64vh * 1.53)')
            }}>
                <div className={styles.imageActionsTabsContainer}>
                    <button className={styles.imageActionsTab} onClick={() => setIsOpened( isOpened => !isOpened)}>
                        <Image width={40} height={40} alt='resize button' src='/icons/maximize-size.svg' />
                    </button>
                    <Link className={styles.imageActionsTab} download="/images/internet.jpeg" href="/images/internet.jpeg">
                        <Image width={40} height={40} alt='download button' src='/icons/download.svg' />
                    </Link>
                </div>
                <Image className={styles.modalImage} src={'/images/internet.jpeg'} width={5174} height={3635} alt={'Памятка по теме'} onClick={() => setIsOpened(true)} />
            </div>

        </div>
    )
}