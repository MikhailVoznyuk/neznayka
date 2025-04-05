import useDataBase from "@/lib/db/useDatabase";
import Button from '@/components/button'
import styles from './page.module.css'
import Link from 'next/link'


async function findCategory(name) {
    const db = new useDataBase();
    const articles = await db.filterArticles(name);
    return articles
}

async function addData() {
    "use server"
    const db = new useDataBase();
    
   
    const allData = await db.readData();
    allData.articles.push({"id": 100, "category": 1, "title": "Седьмой пост", "description": "Описание статьи 7", "content": "Содержание статьи 7"});
    
    await db.saveData(allData);
}


export default async function Page({params}) {

    const db = new useDataBase();
    const category = (await params).category;
    const articles = await findCategory(category);
   
    return (
        <main>
            <div className="container justify-center">

            <div className="flex flex-column align-center">
                {articles.map((article) => (
                    <div className={styles.articlePreview} key={article.id}>
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <Link href={`${category}/${article.id}`}>Тык</Link>
                    </div>
                ))}
            </div>
     
           
            
            
            </div>
        </main>
        
    )
}