import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import useDb from "@/lib/db/useDatabase"

export default async function Home() {
  const db = new useDb();
  const categories = await db.getCategories();
  return (
    <div>
      <main>
        
        <div className="container justify-center">
          
          <div className={styles.sheetsContainer}>
          {categories.map((cat) => (
           
              <Link href={`/${cat.rel}`} className={styles.sheet} key={cat.id}
              >
                {cat.title}
              </Link>
    
            ))}    
          </div>
            
            
        </div>
        
      </main>
    </div>
  );
}
