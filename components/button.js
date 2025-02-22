'use client'

import { Rubik_Mono_One } from "next/font/google"
const RubicMonoOne = Rubik_Mono_One({
    weight: '400',
    subsets: ['cyrillic', 'latin']
  })


export default function HandlerButton({eventHandler, text}) {

    return (
        <button onClick={() => eventHandler()} className={RubicMonoOne.className}>{text}</button>
    )
}