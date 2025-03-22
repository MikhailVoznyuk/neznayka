import React from "react";
import Image from "next/image";
import styles from "./components.module.css"

export default function ArticleContentBlock({title, articleBlockType, backgroundColor, statusImage, isCompleted}) {
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
                <div className={[styles.blockStatusContainer, 'flex justify-center align-center'].join(' ')}>
                    <Image src={statusImage} style={(isCompleted) ? {top: '-2px', left: '1px'} : { top: '0', left: '-1px'}} width={(isCompleted) ? 34 : 32} height={(isCompleted) ? 34 : 32} alt=''></Image>
                </div>
                <Image src={imageUrl} width={170} height={170} alt="Content block icon" />
            </button>
            <div className={styles.articleBlockTitleContainer}>
                <h5 className={styles.articleContentTitle}>{title}</h5>
            </div>
           
        </div>
        
    )
}