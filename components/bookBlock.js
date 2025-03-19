import React from "react";
import Image from "next/image";
import styles from './components.module.css';

import RubikMonoOne from "./fonts/rubikMonoOne";
import { RubikBold } from "./fonts/rubikMonoOne";


function BookRivets() {
    return (
        <div className={styles.bookRivets}>
            <div className={styles.bookRivet}>
                <span className={[styles.bookRivetPuncture, styles.bookRivetPunctureLeft].join(' ')}></span>
                <span className={[styles.bookRivetPuncture, styles.bookRivetPunctureLeft].join(' ')}></span>
                <Image src='/icons/rivet.svg' width={76} height={50} alt=''></Image>
            </div>
            <div className={styles.bookRivet}>
                <span className={[styles.bookRivetPuncture, styles.bookRivetPunctureLeft].join(' ')}></span>
                <span className={[styles.bookRivetPuncture, styles.bookRivetPunctureLeft].join(' ')}></span>
                <Image src='/icons/rivet.svg' width={76} height={50} alt=''></Image>
            </div>
            <div className={styles.bookRivet}>
                <span className={[styles.bookRivetPuncture, styles.bookRivetPunctureLeft].join(' ')}></span>
                <span className={[styles.bookRivetPuncture, styles.bookRivetPunctureLeft].join(' ')}></span>
                <Image src='/icons/rivet.svg' width={76} height={50} alt=''></Image>
            </div>
            <div className={styles.bookRivet}>
                <span className={[styles.bookRivetPuncture, styles.bookRivetPunctureLeft].join(' ')}></span>
                <span className={[styles.bookRivetPuncture, styles.bookRivetPunctureLeft].join(' ')}></span>
                <Image src='/icons/rivet.svg' width={76} height={50} alt=''></Image>
            </div>
        </div>
        
    )
}
function BookArticle({linesCount}) {
    const lines = new Array(linesCount - 1);
    lines.fill(1);
    let counter = 0;
    return (
        <div className={styles.bookArticle}>
            <span style={{width: '84%'}}></span>
            {lines.map(() => (<span key={counter++}/>))}
        </div>
    )
}
export default function BookBlock() {
    return (
        <div className={styles.previewBook}>
            <div className={[styles.bookPageCover, styles.bookPageCoverLeft].join(' ')}>
                <div className={styles.bookPageContent}>
                    <div className={styles.bookTitle}>
                        <h3 className={RubikMonoOne.className}>Справочник по безопасности</h3>
                        <span></span>
                        <p className={RubikBold.className}>Узнай, какие опасности существуют в мире, и как их избежать!</p>
                    </div>
                    <div className={styles.bookPreviewCards}>
                        <div className={styles.bookPreviewCard} style={{backgroundColor: '#D3DED5'}}>
                            <Image src='categories/book_cards/fireSafer.svg' width={64} height={64} alt=''></Image>
                        </div>
                        <div className={styles.bookPreviewCard} style={{backgroundColor: '#FF9064'}}>
                            <Image src='categories/book_cards/oven.svg' width={60} height={60} style={{top: '2px'}} alt=''></Image>
                        </div>
                        <div className={styles.bookPreviewCard} style={{backgroundColor: '#FF8F34'}}>
                            <Image src='categories/book_cards/svetophor.svg' width={60} height={60} alt=''></Image>
                        </div>
                        <div className={styles.bookPreviewCard} style={{backgroundColor: '#63B8C5'}}>
                            <Image src='categories/book_cards/anonim.svg' width={60} height={60} alt=''></Image>
                        </div>
                        <div className={styles.bookPreviewCard} style={{backgroundColor: '#B2A945'}}>
                            <Image src='categories/book_cards/forest.svg' width={66} height={66} alt=''></Image>
                        </div>
                        <div className={styles.bookPreviewCard} style={{backgroundColor: '#FF6064'}}>
                            <Image src='categories/book_cards/matches.svg' width={64} height={64} alt='' style={{top: '4px'}}></Image>
                        </div>
                    </div>
                    <div className={styles.bookButtonContaiener}>
                        <button className={[styles.bookButton, RubikMonoOne.className].join(' ')}>
                            <span>Начать</span>
                            <Image src="/arrow_white.png" alt="" width={20} height={17}></Image>
                        </button>
                    </div>
                </div>
                
            </div>
            <div className={[styles.bookPageCover, styles.bookPageCoverRight].join(' ')}>
                <div className={styles.bookPage} style={{right:'10px'}}></div>
                <div className={styles.bookPage} style={{right:'16px'}}></div>
                <div className={styles.bookPage} style={{right:'22px'}}>
                    
                </div>
                <div className={[styles.bookPage, styles.bookPageContent].join(' ')} style={{right:'28px'}}>  
                    <div className={[styles.bookPageSection, styles.bookPageTitle].join(' ')}>
                        <span style={{width: '52%'}}></span>
                        <span></span>
                        
                    </div>     
                    <div className={styles.bookPageSection}>
                        <BookArticle linesCount={8}/>
                        <Image src='/fire_mini.png' width={160} height={160} alt=''></Image>
                    </div>
                    <div className={styles.bookPageSection}>
                        <div className={styles.textBlock}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className={styles.bookPageSection}>
                        <Image src='/firetrack_mini.png' width={136} height={136} alt='' style={{transform: 'scaleX(-1)'}}></Image>
                        <BookArticle linesCount={6}/>
                    </div>
                </div>
                
            </div>
            <BookRivets></BookRivets>
            <Image className={styles.bookParticle} src='pencil.svg' width={200} height={200} alt=''></Image>
        </div>
    )
}