import Link from 'next/link';
import DataBase from '@/lib/db/useDatabase'
import getBlock from '@/components/article/loadPageElements';

export default async function Page({params}) {
    const db = new DataBase();
    const articleId= (await params).id;
    const article = (await db.getArticleById(articleId));
    console.log(articleId, 'не надо дядя')
    return (
        <main>
            <div>
                {article.content.map((item) => getBlock(item, false))}
            </div>
        </main>
    )
}