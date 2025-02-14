"use server"

import DataBase from "@/lib/db/useDatabase"

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
    let element = await db.addPageElement(pageId, block);
    return element;
}

