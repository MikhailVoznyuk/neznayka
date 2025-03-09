"use client"
import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ArticleNav from '@/components/articleNav';
import ArticleContentBlock from '@/components/articleContentBlock';
import { getCategoryArticleRels,  getArticleByRel, getCategoryById} from '@/components/server/pageEditor';
import styles from './page.module.css';
import { Rubik_Mono_One } from 'next/font/google';
import LoadingPlug from '@/components/loadingPlug';
import modalWindowContext from '@/app/modalContext';
import { UpdateWindowState } from '@/app/modalContext';
import ModalWindow from '@/components/modalWindow';
import PageRender from '@/components/componentRender';
import ArticleModalContentBlock from '@/components/articleModalContentBlock';

const RubicMonoOne = Rubik_Mono_One({
    weight: '400',
    subsets: ['cyrillic', 'latin']
});


export default function Page() {
    function ModalContent({offsetY}) {
        const modalContext = React.useContext(modalWindowContext);
        return (
            <button onClick={() => setModalWindowState(UpdateWindowState({state: false, scrollTop: offsetY, setState: modalContext.setState}))}>Закрыть</button>
        )
    }
   const [articleContent, setArticleContent] = React.useState(null);
   const [articlesNavRels, setArticleNavRels] = React.useState(null);
   const [currentCategory, setCurrentCategory] = React.useState(null);
   const [modalWindowState, setModalWindowState] = React.useState(React.useContext(modalWindowContext));
   const [modalWindowContent, setModalWindowContent] = React.useState((<div></div>))
   const articleRel = usePathname().split('/').at(-1);
   React.useEffect(() => {

    getArticleByRel(articleRel).then((articleContent) => {
        console.log(articleContent);
        getCategoryById(articleContent.category).then(category => {
            setCurrentCategory(category);
        });
        getCategoryArticleRels(articleContent.category).then(categoryRels => setArticleNavRels(categoryRels));
        setArticleContent(articleContent);
        
    });
   }, []);
   React.useEffect(() => {
    console.log(modalWindowState.scrollTop)
    window.scroll(0, modalWindowState.scrollTop)
   })
   console.log(modalWindowState);
   let pageContent;
   if (articleContent != null && articlesNavRels != null && currentCategory != null) {
    pageContent = (
        <main>
            <div className={['container justify-center section-header', RubicMonoOne.className].join(' ')}>
                <h2>{currentCategory?.title}</h2>
            </div>
            <div className={'container justify-center'}>
                <ArticleNav
                    navRels={articlesNavRels}
                    currentDirectory={currentCategory?.rel}
                    currentArticleRel={articleRel}
                    articleSettings={articleContent}
                >
    
                </ArticleNav>
            </div>
            
            <div className = "container justify-center">
                <div className={styles.ArticlesContainer}>
                    {articleContent?.content?.map(block => (
                        <div  key={block.id} className={[styles.articleCardWrapper, RubicMonoOne.className].join(' ')}
                            onClick={() => {
                                const pageRender = new PageRender(false);
                                const articleContentBlock = pageRender.renderComponent(block);
                                const offsetY = document.documentElement.scrollTop
                                const modalContentBlock = (
                                    <ArticleModalContentBlock pageState={modalWindowState} setPageState={setModalWindowState} scrollTop={offsetY}>
                                        {articleContentBlock}
                                    </ArticleModalContentBlock>
                                )
                                
                                setModalWindowContent(modalContentBlock);
                                setModalWindowState({prevContext: modalWindowState, state: true, scrollTop: offsetY})
                            }}>

                            <ArticleContentBlock
                                title = {block.title} 
                                articleBlockType={block.type} 
                                backgroundColor={articleContent.pageColors.contentCard}>
                            </ArticleContentBlock>
                        </div>
                        
                    ))}
                </div>
            </div>
            <ModalWindow windowState={modalWindowState.state}>
                    {modalWindowContent}
            </ModalWindow>
        </main>
    )
   } else {
    pageContent = (
       <LoadingPlug/>
    )
   }
   return  (
    pageContent
   )
}