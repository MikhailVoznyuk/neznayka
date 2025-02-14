import Link from 'next/link';
import DataBase from '@/lib/db/useDatabase'

export default async function Page({params}) {
    const db = new DataBase();
    const articleId= (await params).id;
    const article = await db.getArticleById(articleId);
    return (
        <main>
            <div>
                <h3>{article.title}</h3>
                <h5>{article.description}</h5>
            </div>
        </main>
    )
}