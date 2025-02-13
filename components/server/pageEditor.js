"use server"

import DataBase from "@/lib/db/useDatabase"

export default async function saveBlock(formData, pageId) {
    const db = new DataBase();
    console.log(formData);
    let block = null;
    if (+formData.get('type') == 0) {
        block = {
            type: 0,
            content: formData.get('text')
        }
    }
    db.addPageElement(pageId, block);
}

