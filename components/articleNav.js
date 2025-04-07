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
    const [windowWidth, setWindowWidth] = React.useState(null);
    React.useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', setWindowWidth(window.innerWidth));
    })
    return (
        <div className={styles.articleNavContainer}>
                <div className={styles.articleNav} style={{'--nav-hover-color': articleSettings.pageColors.navLinkActive + 'B3'}}>
                    {navRels.map((rel, ind) => {
                        let articleItem;
                        if (rel.rel == currentArticleRel) {
                            articleItem = (
                                <div className={styles.articleNavItemWrapper} style={{backgroundColor: articleSettings.pageColors.navLink}} key = {rel.id}>
                                    <div className={styles.articleNavItemActiveTitle} style={{backgroundColor: articleSettings.pageColors.navLinkActive, left: ((windowWidth < 498) ? ((ind == 0) ? '-6px' : (ind == navRels.length - 1) ? 'calc(100% - 184px)' : null) : null)}}>
                                        <h5 className={RubicMonoOne.className}>{articleSettings.title}</h5>
                                        <span className={styles.navItemTitleParticle} style={{backgroundColor: articleSettings.pageColors.navLinkActive, left: ((windowWidth < 498) ? ((ind == 0) ? '27px' : (ind == navRels.length - 1) ? '132px' : null) : null)}}></span>
                                    </div>
                                    <Link 
                                        className={styles.articleNavItem} 
                                        href={'/' + [currentDirectory, rel.rel].join('/')} 
                                        style = {{
                                                backgroundColor: articleSettings.pageColors.navLinkActive,
                                                zIndex: 3 
                                            } 
                                        }
                                    >
                                        <Image src={rel.icon} width={(windowWidth >= 498 ) ? 70 : 56} height={(windowWidth >= 498 ) ? 70 : 56} alt="Article navigation icon"></Image>
                                    </Link>
                                </div>
                            )
                        } else {
                            articleItem = (
                                <div className={styles.articleNavItemWrapper} style={{backgroundColor: articleSettings.pageColors.navLink}}  key = {rel.id}>
                                    <Link 
                                        className={[styles.articleNavItem, styles.articleNavItemSecondary].join(' ')} 
                                        href={'/' + [currentDirectory, rel.rel].join('/')} 
                                        style={{zIndex: 2}}
                                    >
                                        <Image src={rel.icon} width={(windowWidth >= 498 ) ? 70 : 56} height={(windowWidth >= 498 ) ? 70 : 56}  alt="Article navigation icon"></Image>
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