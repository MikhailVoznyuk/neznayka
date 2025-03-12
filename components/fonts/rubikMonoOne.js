import { Rubik_Mono_One } from "next/font/google";
import { Rubik } from "next/font/google";

const RubikRegular = Rubik({
    weight: '300',
    subsets: ['cyrillic', 'latin']
})

const RubikBold = Rubik({
    weight: '400',
    subsets: ['cyrillic', 'latin']
})

const RubikMonoOne = Rubik_Mono_One({
    weight: '400',
    subsets: ['cyrillic', 'latin']
})

export {RubikRegular, RubikBold};

export default RubikMonoOne;