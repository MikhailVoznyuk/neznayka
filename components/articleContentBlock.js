import React from "react";
import Image from "next/image";
import styles from "./components.module.css"

export default function ArticleContentBlock({title, articleBlockType, backgroundColor}) {
    const [blockType, setBlockType] = React.useState(articleBlockType);
    let imageUrl = null;
    if (blockType == 0) {
        imageUrl = '/book.svg';
    } else if (blockType == 1) {
        imageUrl = '/image_cards.svg';
    } else if (blockType == 2) {
        imageUrl = '/television.svg';
    } else if (blockType == 3) {
        imageUrl = '/test.svg';
    }
    return (
        <div className={styles.articleContentBlockContainer}>
            <button className={styles.articleContentBlock} style={{backgroundColor: `${backgroundColor}`}} onClick={() => {}}>
                <Image src={imageUrl} width={170} height={170} alt="Content block icon" />
            </button>
            <div className={styles.articleBlockTitleContainer}>
                <h5 className={styles.articleContentTitle}>{title}</h5>
            </div>
        </div>
        
    )
}