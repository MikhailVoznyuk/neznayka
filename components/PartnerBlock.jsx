import Image from 'next/image';
import styles from "./components.module.css"
import React from "react";
import {RubikBold} from "@/components/fonts/rubikMonoOne";

export default function PartnerBlock() {
    return (
        <section className={`${styles.partnerBlock} ${RubikBold.className}`}>

            <p>Результат получен при поддержке гранта Фонда содействия инновациям, предоставленного в рамках программы «Студенческий стартап» федерального проекта «Платформа университетского технологического предпринимательства»</p>
            <Image src={'/foundation.svg'} width={400} height={220} alt='' />
        </section>
    )
}