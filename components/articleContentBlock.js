import React from "react";
import Image from "next/image";
import styles from "./components.module.css"

export default function ArticleContentBlock({title, articleBlockType, backgroundColor, statusImage, isCompleted}) {
    const [blockType, setBlockType] = React.useState(articleBlockType);
    const [windowWidth, setWindowWidth] = React.useState(null);
    React.useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth))
    }, []);
    let imageBlock = null;
    if (blockType == 0) {
        imageBlock = (
            <Image style={{top: '2%'}} src='/book.svg' width={(windowWidth >= 498) ? 174 : 110} height={(windowWidth >= 498) ? 174 : 110} alt="Content block icon" />
        )
    } else if (blockType == 1 || blockType == 4) {
        imageBlock = (
            <Image src='/image_cards.svg' width={(windowWidth >= 498) ? 170 : 110} height={(windowWidth >= 498) ? 170 : 110} alt="Content block icon" />
        )
    } else if (blockType == 2) {
        imageBlock = (
            <Image src='/television.svg' width={(windowWidth >= 498) ? 150 : 90} height={(windowWidth >= 498) ? 150 : 90} alt="Content block icon" />
        )
    } else if (blockType == 3) {
        imageBlock = (
            <Image style={{left:'-5.5%', top: '2%'}}src='/test.svg' width={(windowWidth >= 498) ? 180 : 120} height={(windowWidth >= 498) ? 180 : 120} alt="Content block icon" />
        )
    }
    return (
        <div className={styles.articleContentBlockContainer}>
            <button className={styles.articleContentBlock} style={{backgroundColor: `${backgroundColor}`}} onClick={() => {}}>
                <div className={[styles.blockStatusContainer, 'flex justify-center align-center'].join(' ')}>
                    <Image src={statusImage} style={(windowWidth >= 498) ? (isCompleted) ? {top: '-2px', left: '1px'} : { top: '0', left: '-1px'} : isCompleted ? {top: '-1.5px', left: '1px'} : { top: '0', left: '-1px'} } width={(windowWidth >= 498) ? (isCompleted) ? 34 : 32 : 22} height={(isCompleted) ? 34 : 32} alt=''></Image>
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