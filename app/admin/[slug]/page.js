"use client"

import TextBlock from '@/components/article/modules'
import MyButton from '@/components/myButton'
import React from 'react';
import saveBlock from '@/components/server/pageEditor';
import { usePathname } from 'next/navigation';

function PageEditWindow(blockType, pageId) {

    let block = (
    <div></div>
    );
    if (blockType == 0) {
        console.log('да')
        block = (
            <div>
                <form action={async (formData) => saveBlock(formData, pageId)}>
                    <input type="hidden" value="0" name="type"></input>
                    <textarea name="text"></textarea>
                    <button type="submit">Сохранить</button>
                </form>
            </div>
        )
    }
    return block;
    }


export default function Page({params}) {
    const route = usePathname().split('/').at(-1);
    console.log(route);
    const [components, setComponents] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [blockType, setBlockType] = React.useState(null);
    function handleClick() {
        setComponents(components.concat(getBlock(count)));
        setCount(count + 1);
    }
    

    function getBlock(id) {
        return (<TextBlock key={id} isDev={true} textContent='Тест'></TextBlock>);
    }
    console.log(components)
    return (
        <main>
            <div>
                {components}
                {PageEditWindow(blockType, +route)}
            </div>
            <div>
                <MyButton handler={() => {
                    setBlockType(0);
                    console.log('yes');
                }}></MyButton>
            </div>
        </main>
        
    )
}
    