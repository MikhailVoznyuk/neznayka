import React from "react";
import Image from "next/image";
import styles from "./components.module.css"

export default function ArticleContentBlock({title, articleBlockType, backgroundColor, statusImage, isCompleted}) {
    const [blockType, setBlockType] = React.useState(articleBlockType);
    let imageBlock = null;
    if (blockType == 0) {
        imageBlock = (
            <Image style={{top: '2%'}} src='/book.svg' width={174} height={174} alt="Content block icon" />
        )
    } else if (blockType == 1) {
        imageBlock = (
            <Image src='/image_cards.svg' width={170} height={170} alt="Content block icon" />
        )
    } else if (blockType == 2) {
        imageBlock = (
            <Image src='/television.svg' width={150} height={150} alt="Content block icon" />
        )
    } else if (blockType == 3) {
        imageBlock = (
            <Image style={{left:'-5.5%', top: '2%'}}src='/test.svg' width={180} height={180} alt="Content block icon" />
        )
    }
    return (
        <div className={styles.articleContentBlockContainer}>
            <button className={styles.articleContentBlock} style={{backgroundColor: `${backgroundColor}`}} onClick={() => {}}>
                <div className={[styles.blockStatusContainer, 'flex justify-center align-center'].join(' ')}>
                    <Image src={statusImage} style={(isCompleted) ? {top: '-2px', left: '1px'} : { top: '0', left: '-1px'}} width={(isCompleted) ? 34 : 32} height={(isCompleted) ? 34 : 32} alt=''></Image>
                </div>
                <div className={styles.articleBlockImage}>
                    {imageBlock}
                </div>
            
            </button>
            <div className={styles.articleBlockTitleContainer}>
                <h5 className={styles.articleContentTitle}>{title}</h5>
            </div>
           
        </div>
        
    )
}