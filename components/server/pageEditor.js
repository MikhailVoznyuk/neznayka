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
            title: formData.get('title'),
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
            title: formData.get('title'),
            content: fileName
        };
    } else if (+(formData.get('type')) == 2) {
        const file = formData.get('video');
        const buffer = Buffer.from(await file.arrayBuffer());
        const currentTimestamp = Date.now();
        let fileName = process.cwd() + '/public/videos/' + currentTimestamp + file.name.replaceAll(' ', '_');
        await writeFile(fileName, 
            buffer
        )
        fileName = '/videos/' + currentTimestamp + file.name.replaceAll(' ', '_');
        block = {
            type: 2,
            title: formData.get('title'),
            content: fileName
        };
    }
    
    let element = await db.addPageElement(pageId, block);
    return element;
}

export async function getCategories() {
    const db = new DataBase();
    return await db.getCategories();
}

export async function getFirstArticleRel(category) {
    console.log(category)
    const db = new DataBase;
    return (await db.getFirstCategoryArticleRel(category));
}

export async function getQuizQuestions() {
    const db = new DataBase();
    return await db.getQuizQuestions();
}

export async function getCategoryArticleRels(categoryId) {
    const db = new DataBase();
    return await db.getCategoryArticleRels(categoryId);
}

export async function getAllFirstArticlesRels() {
    const db = new DataBase();
    let allFirstArticleRels = {};
    const categories = await db.getCategories();
    for (let category of categories) {
        let articleRel = await getFirstArticleRel(category.rel);
        if (articleRel) {
            allFirstArticleRels[category.rel] = [category.rel, articleRel].join('/');
        }
    }
    return allFirstArticleRels;

}

export async function getArticleByRel(rel) {
    const db = new DataBase();
    const article = await db.getArticleByRel(rel);
    return article;
}

export async function getCategoryById(id) {
    const db = new DataBase();
    const category = await db.getCategoryById(id);
    return category;
}