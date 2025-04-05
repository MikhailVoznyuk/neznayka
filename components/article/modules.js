import React from 'react';
import styles from './component.module.css'
import RubikMonoOne from '../fonts/rubikMonoOne'
import { RubikBold } from '../fonts/rubikMonoOne';
import Image from 'next/image';
import ModalGallery from './modalGallery';
import ModalQuiz from './modalQuiz';
import { UpdateWindowState } from '@/app/modalContext';
import { addCompletedBlock } from '../server/cookies/cookiesStorage';

export function EditSection() {
    return (
        <div className={styles.editSection}>
            <button>↑</button>
            <button>↓</button>☒
            <button>☒</button>
        </div>
    )
}

export default function ArticleBlock({articleId, component, isDev, categoryContent, modalWindowState, setModalWindowState, setModalWindowContent, offsetY, completedBlocks, setCompletedBlocks}) {
    const [isDone, setIsDone] = React.useState(false);
    const [windowWidth, setWindowWidth] = React.useState(null);
    React.useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth))
    }, []);
    
    if (isDone) {
        
    }
    let componentContent = null;
    let confirmButtonMessage;
    if (component.type == 0) {
        componentContent = (<p className={[styles.articleTextContent, RubikBold.className].join(' ')}><span style={{marginLeft: '2em'}}/>{component.content}</p>);
        confirmButtonMessage = 'Я прочитал';
    } else if (component.type == 1) {
        
        componentContent = (<ModalGallery galleryData={component}></ModalGallery>);
        confirmButtonMessage = 'Я посмотрел';
    } else if (component.type == 2) {
        componentContent = (<video className={styles.articleVideoContent} controls={true} src={component.content}></video>);
        confirmButtonMessage = 'Я посмотрел';
    } else if (component.type == 3) {
        componentContent = (<ModalQuiz articleId={articleId} quizContent={component} categoryContent={categoryContent} modalWindowState={modalWindowState} setModalWindowContent={setModalWindowContent} setModalWindowState={setModalWindowState} offsetY={offsetY} completedBlocks={completedBlocks} setCompletedBlocks={setCompletedBlocks}/>);
        confirmButtonMessage = 'Я посмотрел';
    } else {
        componentContent = (<div>В разработке</div>)
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
                {component.type != 3 ?
                ( <div className={[styles.articleBlockTitle, RubikMonoOne.className].join(' ')}>
                    <h5>{component.title}</h5>
                </div>) :  null
                }
               
                <div className={styles.articleBlockContent} style={component.type == 3 ? {
                    marginBottom: 0
                } :
                {}}>
                    {componentContent}
                </div>
                {component.type != 3 ? (
                     <div className={styles.articleBlockButtonContainer}>
                        <button 
                            className={[styles.articleBlockButton, RubikMonoOne.className].join(' ')}
                            onClick={() => {
                                setCompletedBlocks(completedBlocks.add(component.id));
                                addCompletedBlock(articleId, component.id);
                                setModalWindowState(UpdateWindowState({
                                    prevContext: modalWindowState,
                                    state: false,
                                    scrollTop: offsetY, 
                                }));
                                setTimeout(() => {
                                    setModalWindowContent((<div></div>))
                                }, 500);
                            }}>{confirmButtonMessage}</button>
                    </div>
                    ) : null
                }
               
                
    
                <div className={styles.particle} style={(windowWidth >= 550) ? {top: '-30px', left: '10px'} : {top: '-10px', left: '-4px'} }>
                    <Image src={(windowWidth >= 550) ? '/icons/notes.svg' : '/icons/notes_sm.svg'} width={(windowWidth >= 550) ? 80 : 60} height={(windowWidth >= 550) ?  Math.trunc(80 / 1.63265) : Math.trunc(60 / 1.63265)} alt={'Aricle Block Particle'}></Image>
                </div>
                <div className={styles.particle} style={(windowWidth >= 550) ? {top: '10px', left: '-72px'} : {top: '10px', left: '-42.5px'}}>
                    <Image src= '/icons/rivets.svg' width={(windowWidth >= 550) ? 90 : 70} height={(windowWidth >= 550) ? Math.trunc(90 / 1.25) : Math.trunc(70 / 1.25)}  alt={'Aricle Block Particle'}></Image>
                </div>
            </div>
        )
        
    }
}


