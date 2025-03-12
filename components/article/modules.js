import styles from './component.module.css'
import RubikMonoOne from '../fonts/rubikMonoOne'
import { RubikBold } from '../fonts/rubikMonoOne';
import Image from 'next/image';
import ModalGallery from './modalGallery';

export function EditSection() {
    return (
        <div className={styles.editSection}>
            <button>↑</button>
            <button>↓</button>☒
            <button>☒</button>
        </div>
    )
}

export default function ArticleBlock({component, isDev}) {
    let componentContent = null;
    let confirmButtonMessage;
    if (component.type == 0) {
        componentContent = (<p className={[styles.articleTextContent, RubikBold.className].join(' ')}><span style={{marginLeft: '2em'}}/>{component.content}</p>);
        confirmButtonMessage = 'Я прочитал';
    } else if (component.type == 1) {
        console.log(component);
        componentContent = (<ModalGallery galleryData={component}></ModalGallery>);
        confirmButtonMessage = 'Я посмотрел';
    } else if (component.type == 2) {
        componentContent = (<video className={styles.articleVideoContent} controls={true} src={component.content}></video>);
        confirmButtonMessage = 'Я посмотрел';
    } else {
        componentContent = (<div>В разработке</div>);
        confirmButtonMessage = 'Я посмотрел';
    }
    if (isDev) {
        return (
            <div key={component.id} className={styles.textBlock}>
                <EditSection></EditSection>
                {componentContent}
            </div>
        )
    } else {
        return (
            <div key={component.id} className={styles.articleBlockContainer}>
                <div className={[styles.articleBlockTitle, RubikMonoOne.className].join(' ')}>
                    <h5>{component.title}</h5>
                </div>
                <div className={styles.articleBlockContent}>
                    {componentContent}
                </div>
                <div className={styles.articleBlockButtonContainer}>
                    <button className={[styles.articleBlockButton, RubikMonoOne.className].join(' ')}>{confirmButtonMessage}</button>
                </div>
                
    
                <div className={styles.particle} style={{top: '-30px', left: '10px'}}>
                    <Image src='/icons/notes.svg' width={80} height={49} alt={'Aricle Block Particle'}></Image>
                </div>
                <div className={styles.particle} style={{top: '10px', left: '-76.5px'}}>
                    <Image src='/icons/rivets.svg' width={100} height={80} alt={'Aricle Block Particle'}></Image>
                </div>
            </div>
        )
        
    }
}


