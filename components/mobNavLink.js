import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from './components.module.css'

export default function MobNavLink({href, title, imageSrc, imgTop=null, imgLeft=null, imgSize=null}) {
    return (
        <Link className={styles.mobNavLink} href={href}>
            <Image src={imageSrc} width={imgSize ? imgSize : 25} height={imgSize ? imgSize : 25} alt=""></Image>
            <span>{title}</span>
        </Link>
    )
}