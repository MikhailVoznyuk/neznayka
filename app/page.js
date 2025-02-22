"use client"

import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

import HandlerButton from "@/components/button";
import { Rubik_Mono_One } from "next/font/google";
import { getCategories, getQuizQuestions } from "@/components/server/pageEditor";


const RubicMonoOne = Rubik_Mono_One({
  weight: '400',
  subsets: ['cyrillic', 'latin']
})

function CategoryCard({rel, title, image, backgroundColor, titleBackground}) {
  return (
    <Link href={rel} className={[styles.sheet, RubicMonoOne.className].join(' ')} style={{backgroundColor: `${backgroundColor}`}}>
      <div className={styles.sheetTitleContainer} style={{backgroundColor: `${titleBackground}`}}>
        <h3>{title}</h3>
      </div>
      <div className={styles.gradient} style={{boxShadow: `inset 0 0 100px 30px ${backgroundColor}`}}></div>
      <Image className={styles.sheetImage} src={image} width={300} height={250} alt="Категория"></Image>

    </Link>
  )
}

function Quiz(qestions, curQestion) {
  
  const [state, setStage] = React.useState(0);
  const [mistakesCounter, setMistakesCounter] = React.useState(0);
  const [quizQuestions, setQuizQuestions] = React.useState([]);
  function QuestionWindow() {
    return (
      <div className={styles.quizQuestionContainer}>
      
        {quizQuestions.map(question => {
        console.log(question);
        return (
          <div key={question.id} className={[styles.quizQuestion, RubicMonoOne.className].join(' ')}>
            <div className={styles.questionTitleContainer}>
              <h5>{question.question}</h5>
              <span></span>
            </div>
            <div className={styles.questionBody}>
             
              {question.answers.map(answer => {
                return (
                  <div key={answer.id}>
                  <button className={RubicMonoOne.className} onClick={() => {
                    if (answer.id == question.correctAnswer) {
                      alert('верно');
                    } else {
                      alert('Неверно');
                    }
                  }}>{answer.content}</button>
                  </div>
                )
              })}
                    
                  
                 
         
            </div>
          </div>
        )
        
      })}
      
    </div>
    )
    
  }
  React.useEffect(() => {
    getQuizQuestions().then(e => setQuizQuestions(e))
  }, []);

  return (
    <div className={styles.quizWindow}>
      <QuestionWindow></QuestionWindow>
      
    </div>
  )
}

function QuizStatic() {
  const [quizState, setQuizState] = React.useState(false);
  let quizBlock = null;
  if (quizState == false) {
    quizBlock = (
      <div className={[styles.quizStatic, RubicMonoOne.className].join(' ')}>
        <div className={styles.quizStaticContent}>
          <h5>Пройдите 5-минутную викторину и проверьте свои знания!</h5>
          <HandlerButton eventHandler={() => setQuizState(true)} text={<div className={styles.btnContent}><span className={styles.btnText}>Начать</span><span className={styles.btnArrow}></span></div>}></HandlerButton>
        </div>
        <div className={styles.quizStaticBackground}></div>
      </div>
    )
  } else {
    quizBlock = (  
      <div className={styles.quizStatic} style={quizState ? {height: '510px'} : {height: '250px'}}>
          <Quiz></Quiz>
          <div className={styles.quizCharacter}></div>
      </div>
    )
  }
  return quizBlock;
}
export default function Page() {
  const [categories, setCategories] = React.useState([])
  React.useEffect(() => {
    getCategories().then(e => setCategories(e))}, [])
  return (
    <div>
      <main>
        
        <div className="container justify-center">
          
          <div className={styles.sheetsContainer}>
          {categories.map((cat) => (
            <CategoryCard key={cat.id} rel={cat.rel} title={cat.title} backgroundColor={cat.backgroundColor} titleBackground={cat.titleColor} image={cat.image}></CategoryCard>
              /*<Link href={`/categories/${cat.rel}`} className={styles.sheet} key={cat.id}
              >
                {cat.title}
              </Link>*/
    
            ))}    
          </div>
            
            
        </div>
        <div className="container justify-center">
          <QuizStatic></QuizStatic>
        </div>
      </main>
    </div>
  );
}
