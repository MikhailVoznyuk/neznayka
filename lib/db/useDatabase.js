import { promises as fs } from 'fs';

export default class DataBase {
    constructor() {
        this.databaseFileDir = process.cwd() + '/' + 'lib' + '/' + 'db' + '/' + 'db.json';
    }
    async readData() {
        console.log(this.databaseFileDir)
        const file = await fs.readFile(this.databaseFileDir, 'utf8');
        const data = JSON.parse(file);
        return data;
    }
    async saveData(newData) {
        console.log('ye')
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
        console.log(categoryId);
        let filteredArticles = [];
        for (let item of data.articles) {
            if (categoryId === item.category) {
                filteredArticles.push(item);
            }
        }
        return filteredArticles;
    }

    async getArticleById(id) {
        const data = await this.readData();
        for (let item of data.articles) {
            if (item.id == id) {
                return item;
            }
        }
        return null;
    }
}