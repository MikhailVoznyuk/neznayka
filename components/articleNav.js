import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from './components.module.css';
import { Rubik_Mono_One } from "next/font/google";

const RubicMonoOne = Rubik_Mono_One({
    weight: '400',
    subsets: ["cyrillic", "latin"]
})

export default function ArticleNav({navRels, currentDirectory, currentArticleRel, articleSettings}) {
    const [currentRelInd, setCurrentRelInd] = React.useState(navRels.findIndex(item => item.rel == currentArticleRel));
    console.log('relId', currentRelInd)
    return (
        <div className={styles.articleNavContainer}>
                <div className={styles.articleNav}>
                    {navRels.map(rel => {
                        let articleItem;
                        if (rel.rel == currentArticleRel) {
                            articleItem = (
                                <div className={styles.articleNavItemWrapper}  key = {rel.id}>
                                    <div className={styles.articleNavItemActiveTitle} style={{backgroundColor: articleSettings.pageColors.navLinkActive}}>
                                        <h5 className={RubicMonoOne.className}>{articleSettings.title}</h5>
                                        <span className={styles.navItemTitleParticle} style={{backgroundColor: articleSettings.pageColors.navLinkActive}}></span>
                                    </div>
                                    <Link 
                                        className={styles.articleNavItem} 
                                        href={'/' + [currentDirectory, rel.rel].join('/')} 
                                        style = {(rel.rel == currentArticleRel) ? 
                                            {
                                                backgroundColor: articleSettings.pageColors.navLinkActive,
                                                zIndex: 2 
                                            } : 
                                            {
                                                backgroundColor: articleSettings.pageColors.navLink
                                            }
                                        }
                                    >
                                        <Image src={rel.icon} width={70} height={70} alt="Article navigation icon"></Image>
                                    </Link>
                                </div>
                            )
                        } else {
                            articleItem = (
                                <div className={styles.articleNavItemWrapper}  key = {rel.id}>
                                    <Link 
                                        className={styles.articleNavItem} 
                                        href={'/' + [currentDirectory, rel.rel].join('/')} 
                                        style = {(rel.rel == currentArticleRel) ? 
                                            {
                                                backgroundColor: articleSettings.pageColors.navLinkActive,
                                                zIndex: 2 
                                            } : 
                                            {
                                                backgroundColor: articleSettings.pageColors.navLink
                                            }
                                        }
                                    >
                                        <Image src={rel.icon} width={70} height={70} alt="Article navigation icon"></Image>
                                    </Link>
                                </div>
                            )
                        }
                        return (
                            articleItem
                        )
                    })}
                    {
                        (currentRelInd > 0)
                        ? <Link className={[styles.articleNavSideLink, styles.articleNavSideLinkLeft].join(' ')} style={{backgroundColor: `${articleSettings.pageColors.navLinkActive}`}} href={'/' + [currentDirectory, navRels[currentRelInd - 1].rel].join('/')}> 
                            <Image src={"/icons/arrow_white.svg"} width={16} height={16} alt={'Article link arrow left'}></Image> </Link>
                        : <Link className={[styles.articleNavSideLink, styles.articleNavSideLinkLeft, styles.disabled].join(' ')} href={'/' + [currentDirectory, navRels[currentRelInd].rel].join('/')} onClick={(event) => event.preventDefault()}>
                            <Image src={"/icons/arrow_white.svg"} width={16} height={16} alt={'Article link arrow left'}></Image> </Link>
                    }
                    {
                        (currentRelInd <  navRels.length - 1)
                        ? <Link className={[styles.articleNavSideLink, styles.articleNavSideLinkRight].join(' ')} style={{backgroundColor: `${articleSettings.pageColors.navLinkActive}`}} href={'/' + [currentDirectory, navRels[currentRelInd + 1].rel].join('/')}>
                            <Image src={"/icons/arrow_white.svg"} width={16} height={16} alt={'Article link arrow right'}></Image> </Link>
                        : <Link className={[styles.articleNavSideLink, styles.articleNavSideLinkRight, styles.disabled].join(' ')} onClick={(event) => event.preventDefault()} href={'/' + [currentDirectory, navRels[currentRelInd].rel].join('/')}>
                            <Image src={"/icons/arrow_white.svg"} width={16} height={16} alt={'Article link arrow right'}></Image> </Link>
                    }
                </div>
                
               
         
        </div>
    )
}