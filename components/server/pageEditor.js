"use server"

import DataBase from "@/lib/db/useDatabase"
import {writeFile} from "fs/promises"

export async function getAllArticles() {
    const db = new DataBase();
    return (await db.getArtcles());
}
export async function getArticleById(id) {
    const data = await getAllArticles();
    for (let item of data) {
        if (item.id == id) {
            return item;
        }
    }
    return null;
}
export default async function saveBlock(formData, pageId) {
    const db = new DataBase();
    console.log(formData);
    let block = null;
    if (+(formData.get('type')) == 0) {
        block = {
            type: 0,
            content: formData.get('text')
        }
    }
    else if (+(formData.get('type')) == 1) {
        
        const file = formData.get('image');
        const currentTimestamp = Date.now();
        const buffer = Buffer.from(await file.arrayBuffer());
        let fileName = process.cwd() + '/public/images/' + currentTimestamp + file.name.replaceAll(' ', '_');
        await writeFile(fileName, 
            buffer
        )
        
        fileName = '/images/' + currentTimestamp + file.name.replaceAll(' ', '_');
        block = {
            type: 1,
            content: fileName
        };
    } else if (+(formData.get('type')) == 2) {
        const file = formData.get('video');
        const buffer = Buffer.from(await file.arrayBuffer());
        const currentTimestamp = Date.now();
        let fileName = process.cwd() + 'public/videos/' + currentTimestamp + file.name.replaceAll(' ', '_');
        await writeFile(fileName, 
            buffer
        )
        fileName = 'public/videos/' + currentTimestamp + file.name.replaceAll(' ', '_');
        block = {
            type: 1,
            content: fileName
        };
    }
    
    let element = await db.addPageElement(pageId, block);
    return element;
}

