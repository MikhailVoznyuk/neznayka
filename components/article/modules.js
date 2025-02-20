import styles from './component.module.css'

export function EditSection() {
    return (
        <div className={styles.editSection}>
            <button>↑</button>
            <button>↓</button>☒
            <button>☒</button>
        </div>
    )
}

export default function TextBlock({textContent, isDev}) {
    if (isDev) {
        return (
            <div className={styles.textBlock}>
                <EditSection></EditSection>
                <p>{textContent}</p>
            </div>
        )
    } else {
        return (
            <div className={styles.textBlock}>
                <p>{textContent}</p>
            </div>
        )
        
    }
}

export function ImageBlock({imgUrl, isDev}) {
    if (isDev) {
        return (
            <div className={styles.imageBlock}>
                <EditSection></EditSection>
                <img src={imgUrl}></img>
            </div>
        ) 
    } else {
        return (
            <div className={styles.imageBlock}>
                <img src={imgUrl}></img>
            </div>
        )
    }
}

export function VideoBlock({vidioUrl, isDev}) {
    if (isDev) {
        return (
            <div className={styles.videoBlock}>
                <EditSection></EditSection>
                <video src={vidioUrl}>
                </video>
            </div>
        )
    } else {
        return (
            <div className={styles.videoBlock}>
                <video src={vidioUrl}></video>
            </div>
        )
    }
}

