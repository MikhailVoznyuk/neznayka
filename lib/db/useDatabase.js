import { promises as fs } from 'fs'

export default class DataBase {
    constructor() {
        this.databaseFileDir = process.cwd() + '/' + 'lib' + '/' + 'db' + '/' + 'db.json';
    }
    async readData() {
        
        const file = await fs.readFile(this.databaseFileDir, 'utf8');
        const data = JSON.parse(file);
        return data;
    }
    async saveData(newData) {
        
        const updatedData = JSON.stringify(newData);
        await fs.writeFile(this.databaseFileDir, updatedData);
    }
    async getCategories() {
        const data = await this.readData();
        return data.categories;
    }
    async getArtcles() {
        const data = await this.readData();
        return data.articles;
    }
    async filterArticles(category) {
        const data = await this.readData();
        const categoryId =(await this.getCategories()).find((item) => item.rel === category).id;
        
        let filteredArticles = [];
        for (let item of data.articles) {
            if (categoryId === item.category) {
                filteredArticles.push(item);
            }
        }
        
        return filteredArticles;
    }
    async getCategoryArticleRels(categoryId) {
        const data = (await this.readData()).articles;
        const articles = await data.filter(article => article.category == categoryId);
        if (articles.length != 0) {
            return articles.map(item => ({
                id: item.id,
                rel: item.rel,
                icon: item.linkIcon})
            )
        }
        return articles;
    }

    async getCategoryById(id) {
        const categories = (await this.readData()).categories;
        return categories.find((item) => item.id == id);
    }

    async getFirstCategoryArticleRel(category) {
        
        const filteredArticles = (await this.filterArticles(category));
        if (filteredArticles.length == 0) {
            return null;
        } else {
            return filteredArticles[0].rel;
        }
    }

    async getArticleByRel(rel) {
        const articles = (await this.readData()).articles;
        const currentArticle = articles.find((article => article.rel == rel));
        
        return currentArticle;
    }

    async getArticleById(id) {
        const data = await this.getArtcles();
    
        for (let item of data) {
            if (item.id == id) {
                return item;
            }
        }
        return null;
    }
    async getPageData(id) {
        
        return new Promise (async (resolve, reject) => {
            let data = await this.getArticleById(id);
            resolve(data);
        })
    }

    async addPageElement(pageId, element) {
        
        let data = await this.readData();
        
        for (let item of data.articles) {
            
            if (item.id == pageId) {
                let elementId = item.content.length;
                element["id"] = elementId;
                item.content.push(element);
                
                await this.saveData(data);
                return element;
                
            }
        }
        return false;
    }
    async getQuizQuestions() {
        const data = await this.readData();
        return data.quizQuestions;
    }
    
}