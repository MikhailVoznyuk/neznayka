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