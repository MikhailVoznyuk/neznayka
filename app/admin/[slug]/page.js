"use client"

import TextBlock from '@/components/article/modules'
import MyButton from '@/components/myButton'
import React from 'react';
import saveBlock from '@/components/server/pageEditor';
import { usePathname } from 'next/navigation';
import {getArticleById} from '@/components/server/pageEditor';




export default function Page({params}) {
    
    const route = usePathname().split('/').at(-1);
    const [components, setComponents] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [blockType, setBlockType] = React.useState(null);

    function PageEditWindow(blockType, pageId) {

        let block = (
        <div></div>
        );
        if (blockType == 0) {
            console.log('да')
            block = (
                <div>
                    <form action={async (formData) => {
                        console.log('дерьмо работает');
                        
                        const newComponent = await saveBlock(formData, pageId);
                        setComponents(components.concat(newComponent));
                        }}>
                        <input type="hidden" value="0" name="type"></input>
                        <textarea name="text"></textarea>
                        <button type="submit">Сохранить</button>
                    </form>
                </div>
            )
        }
        return block;
    }

    React.useEffect(() => {
        getArticleById(route).then((e) => {
            console.log(e);
            setComponents(e.content);
    });
    }, []);
    function handleClick() {
        setComponents(components.concat(getBlock(count)));
        setCount(count + 1);
    }
    

    function getBlock(id) {
        return (<TextBlock key={id} isDev={true} textContent='Тест'></TextBlock>);
    }

    return (
        <main>
            <div>
                {components.map((item) => {
                    console.log(item.content);
                    return (
                        <TextBlock key={item.id} isDev={true} textContent={item.content}></TextBlock>
                    )
                })}
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
    