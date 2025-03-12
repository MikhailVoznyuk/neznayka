"use client"

import TextBlock from '@/components/article/modules'
import {ImageBlock, VideoBlock} from '@/components/article/modules'

import React from 'react';
import saveBlock from '@/components/server/pageEditor'
import { usePathname } from 'next/navigation';
import {getArticleById} from '@/components/server/pageEditor';
import CreateBlockButton from '@/components/CreateBlockButton';
import PageRender from '@/components/componentRender';




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
                        setBlockType(null);
                        }}>
                        <input type='text' name="title" placeholder='Введите название блока'></input>
                        <input type="hidden" value="0" name="type"></input>
                        <textarea name="text"></textarea>
                        <button type="submit">Сохранить</button>
                    </form>
                </div>
            )
        } else if (blockType == 1) {
            block = (
                <div>
                    <form action={async (formData) => {
                        const newComponent = await saveBlock(formData, pageId);
                        setComponents(components.concat(newComponent));
                        setBlockType(null);
                    }}>
                        <input type='text' name="title" placeholder='Введите название блока'></input>
                        <input type='hidden' name='type' value='1'></input>
                        <input type='file' name='image'></input>
                        <button type='submit'>Сохранить</button>
                    </form>
                </div>
            )
        } else if (blockType == 2) {
            block = (
                <div>
                    <form action={async (formData) => {
                        const newComponent = await saveBlock(formData, pageId);
                        setComponents(components.concat(newComponent));
                        setBlockType(null);
                    }}>
                        <input type='text' name="title" placeholder='Введите название блока'></input>
                        <input type='hidden' name='type' value='2'></input>
                        <input type='file' name='video'></input>
                        <button type='submit'>Сохранить</button>
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
    const componentsRender = new PageRender(true);
    return (
        <main>
            <div>
                {components.map((item) => {
                    console.log(item.content);
                    return (
                    <div key={item.id}>
                        {componentsRender.renderComponent(item)}
                    </div>
                    )
                })}
                {PageEditWindow(blockType, +route)}
            </div>
            <div>
                <CreateBlockButton btnText='Текст' handler={() => {
                    setBlockType(0);
                }}></CreateBlockButton>
            </div>
            <div>
                <CreateBlockButton btnText='Изображение' handler={() => {
                    setBlockType(1);
                }}></CreateBlockButton>
            </div>
            <div>
                <CreateBlockButton btnText='Видео' handler={() => {
                    setBlockType(2);
                }}></CreateBlockButton>
            </div>
        </main>
        
    )
}
    