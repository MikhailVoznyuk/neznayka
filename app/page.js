import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import useDb from "@/lib/db/useDatabase"

function CategoryCard({title, image, backgroundColor, gradColor, titleBackground}) {
  return (
    <div className={styles.sheet}>
      <div className={styles.sheetTitleContainer} style={`background-color: ${titleBackground}`}>
        <h3>{title}</h3>
      </div>
      <div className={[style.gradient, style.gradientTop].join(' ')}></div>
      <div className={[style.gradient, style.gradientRight].join(' ')}></div>
      <div className={[style.gradient, style.gradientBottom].join(' ')}></div>
      <div className={[style.gradient, style.gradientLeft].join(' ')}></div>
      <div className={styles.sheetImage} style={`background-image: url('${image}')`}>

      </div>

    </div>
  )
}
export default async function Home() {
  const db = new useDb();
  const categories = await db.getCategories();
  return (
    <div>
      <main>
        
        <div className="container justify-center">
          
          <div className={styles.sheetsContainer}>
          {categories.map((cat) => (
           
              <Link href={`/categories/${cat.rel}`} className={styles.sheet} key={cat.id}
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
