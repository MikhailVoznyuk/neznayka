import { Rubik_Mono_One } from "next/font/google";
import styles from "./components.module.css";

const RubicMonoOne = Rubik_Mono_One({
    weight: '400',
    subsets: ['cyrillic', 'latin']
  })


export default function SideNotice({content, color, backgroundColor, customStyle, isReversed}) {
    if (!isReversed) {
        return (
            <div className={[styles.sideNoticeWrapper, RubicMonoOne.className].join(' ')} style={customStyle}>
              <div className={styles.sideNotice}>
                  <span className={styles.sideNoticeParticle} style={{backgroundColor: `${backgroundColor}`}}></span>
                  <span className={styles.sideNoticeText} style={{color: `${color}`, backgroundColor: `${backgroundColor}`}}>{content}</span>
              </div>
              
            </div>
        )
    } else {
        return (
            <div className={[styles.sideNoticeWrapper, RubicMonoOne.className].join(' ')} style={customStyle}>
            <div className={styles.sideNotice}>
                <span className={[styles.sideNoticeParticle, styles.sideNoticeParticleRight].join(' ')} style={{backgroundColor: `${backgroundColor}`}}></span>
                <span className={styles.sideNoticeText} style={{color: `${color}`, backgroundColor: `${backgroundColor}`}}>{content}</span>
            </div>
            
         </div>
        ) 
    }
    
}

