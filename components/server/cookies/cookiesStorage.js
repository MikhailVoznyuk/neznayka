'use server'

import { cookies } from "next/headers";

class UserProgressCookies {
    constructor() {
        this.cookieEntryName = 'vizhivaykaLessonsProgress'
    }
    async readCookies() {
        const cookieStore = await cookies();
        if (cookieStore.has(this.cookieEntryName)) {
            return cookieStore.get(this.cookieEntryName).value;
        } else {
            cookieStore.set({
                name: this.cookieEntryName,
                value: '',
                maxAge: 2 ** 30
            })
            return '';
        }
    }
    async getArticleProgress(articleId) {
        const articlesProgress = await this.readCookies();
        console.log('articlesProgress', articlesProgress)
        if (!articlesProgress) {
            return new Set();
        } 
            
        const articlesProgressArr = articlesProgress.split(';');
        let completedBlocks = new Set();
        for (let articleProgress of articlesProgressArr) {
            if (articleProgress == '') {
                continue;
            }
            const [curArticleId, blockId] = articleProgress.split('.').map(item => +item);
            if (articleId == curArticleId) {
                completedBlocks.add(blockId);
            }
        }
        return completedBlocks;
    }

    async addCompletedBlock(articleId, blockId) {
        
        const cookieStore = await cookies();
        let articlesProgress = await this.readCookies();
        const completedBlocks = await this.getArticleProgress(articleId);
        if (completedBlocks.has(blockId)) {
            console.log('exitsts')
            return articlesProgress;
        }
        articlesProgress += `${articleId}.${blockId};`
        cookieStore.set({
            name: this.cookieEntryName,
            value: articlesProgress,
            maxAge: 2 ** 30
        });
        return articlesProgress;
        //Обработать новый блок и записать его корректный формат в cookie
    }
}

export default async function getArticleProgress(articleId) {
    const userProgressCookies = new UserProgressCookies();
    return userProgressCookies.getArticleProgress(articleId);
}

export async function addCompletedBlock(articleId, blockId) {
    const userProgressCookies = new UserProgressCookies();
    return userProgressCookies.addCompletedBlock(articleId, blockId);
}
