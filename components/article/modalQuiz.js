import React from "react";
import TestButton from "@/components/buttons";
import SideNotice from "@/components/sidenotice";
import styles from './component.module.css';
import RubikMonoOne from "../fonts/rubikMonoOne";
import Image from "next/image";
import { UpdateWindowState } from "@/app/modalContext";
import { addCompletedBlock } from "../server/cookies/cookiesStorage";



export default function ModalQuiz({articleId, quizContent, categoryContent, modalWindowState, setModalWindowState, setModalWindowContent, offsetY, completedBlocks, setCompletedBlocks}) {
    console.log(completedBlocks, setCompletedBlocks)
    const [stage, setStage] = React.useState(0);
    const [mistakesCounter, setMistakesCounter] = React.useState(0);
    const [totalAnswersCounter, setTotalAnswersCounter] = React.useState(0);
    const [quizQuestions, setQuizQuestions] = React.useState(quizContent.content);
    const [category, setCategory] = React.useState({});
    const [lastQuestionAttended, setLastQuestionAtended] = React.useState(-1);
    const [quizResultScore, setQuizResultScore] = React.useState(null);
    const [windowWidth, setWindowWidth] = React.useState(null);

    React.useEffect( () => {
        setQuizQuestions(quizContent.content.concat({isLast:true}));
        setCategory(categoryContent);
    }, []);

    React.useEffect(() => {
      setWindowWidth(window.innerWidth);
    });

    
    console.log(quizQuestions);
    const count = quizQuestions.length;
    let quizBarSections = [];
    let quizBarLines = [];
    for (let i = 0; i < count; i++) {
      quizBarSections.push(i);
    }
  
      return (
        
        <div className={styles.quizWindow}>
          <div className={styles.quizWindowHeader}>
            <div className={[styles.quizBar, RubikMonoOne.className].join(' ')} style={(windowWidth >= 750) ? {width: `${30 * count + 40 * (count) - 4}px`} : {width: `${16 * count + 12 * (count) - 4}px`} }>
              {quizBarSections.map(item => {
                let block = null;
                if (item < stage) {
                  block = (
                    <span key={item} className={styles.quizBarStage} style={(windowWidth >= 750) ? {left: `${item * 40 + item * 30}px`, backgroundColor: `#FF9742`, color: "#FFF"} : {left: `${item * 12 + item * 18}px`, backgroundColor: `#FF9742`, color: "#FFF"}}>
                      {item + 1}
                    </span>
                  )
                } else if (stage == count - 1 && item == count - 1) {
                  block = (
                    <span key={item} className={styles.quizBarStage} style={(windowWidth >= 750) ? {left: `${item * 40 + item * 30}px`, backgroundColor: `#FF9742`, color: "#FFF"} : {left: `${item * 12 + item * 18}px`,  backgroundColor: `#FF9742`, color: "#FFF"}}>
                      <Image src="/flags.svg" alt="Quiz final step icon" width={19} height={19}></Image>
                    </span>
                  )
                } else {
                  if (item == count - 1) {
                    block = (
                      <span key={item} className={styles.quizBarStage} style={(windowWidth >= 750) ? {left: `${item * 40 + item * 30}px`} : {left: `${item * 12 + item * 18}px`}}>
                        <Image src="/flags.svg" alt="Quiz final step icon" width={(windowWidth >= 750) ? 19: 14} height={(windowWidth >= 750) ? 19: 14}></Image>
                      </span>
                    )
                  } else {
                    block = (
                      <span key={item} className={styles.quizBarStage} style={(windowWidth >= 750) ? {left: `${item * 40 + item * 30}px`} : {left: `${item * 12 + item * 18}px`}}>
                        {item + 1}
                      </span>
                    ) 
                  }  
                }
                return block;
                }
              )}
              <span className={styles.quizBarLine} style={(windowWidth >= 750) ? {width: `${30 * count + 40 * (count - 1) - 4}px`, left: "2px"} : {width: `${16 * count + 12 * (count - 1) - 4}px`, left: "2px"} }></span>
              <span className={styles.quizBarLine} style={(windowWidth >= 750) ? {width: `${2 * stage + stage * 40 + stage * 27}px`, left: "28px", backgroundColor: "#FF9742"} : {width: `${2 * stage + stage * 12 + stage * 13}px`, left: "18px", backgroundColor: "#FF9742"}}></span>
            
            </div>
        </div>
          
          <div className={styles.stageContainer}>
          <div className={styles.questionTitleContainer} style = {quizResultScore != null && windowWidth < 750 ? {top: '100px'}  : {}}>
              <h5 className={RubikMonoOne.className}>{quizQuestions[stage]?.question}</h5>
              <span></span>
          </div>
          <div className={[styles.quizResultContainer, RubikMonoOne.className].join(' ')} style={(quizResultScore != null) ? ((windowWidth >= 750) ? {top: '330px',zIndex: 1, opacity: 1} : {top: '340px', zIndex: 1, opacity: 1}) : {}}>
            <p>Твой результат:<br></br>{quizResultScore} из 100 баллов</p>
          </div>
            <div className={styles.quizConfirmButtonContainer} style={(quizResultScore != null) ? {opacity: 1, zIndex: 1, transform: 'translateY(0)'} : {}}>
              <button 
                className={[styles.quizConfirmButton, RubikMonoOne.className].join(' ')}
                onClick={() => {
                  console.log(quizContent.id)
                  setCompletedBlocks(completedBlocks.add(quizContent.id));
                  addCompletedBlock(articleId, quizContent.id);
                  setModalWindowState(UpdateWindowState({
                    prevContext: modalWindowState,
                    state: false,
                    scrollTop: offsetY
                  }));
                  setTimeout(() => setModalWindowContent(null), 500); 
                }}>Закончить тест</button>
            </div>
            <div className={styles.quizQuestionContainer} style={(quizResultScore != null && windowWidth < 750) ? {position: 'absolute', top: '-4px'} : {}}>
            
              {quizQuestions.map(question => {
                if (!question.isLast) {
                  let answersCounter = 0;
                  let questionTried = false
                  return (
                    <div key={question.id} className={[styles.quizQuestion, RubikMonoOne.className].join(' ')}>
                      
                      <div className={styles.questionBody}>
                        
                        {question.answers.map(answer => {
                          answersCounter += 0.15
                          return (
                            <div key={answer.id}>
                              <TestButton guess={answer.id}
                                  buttonText = {answer.content}
                                  answer={question.correctAnswer} 
                                  basicClass={[RubikMonoOne.className]}
                                  ifCorrectClass={styles.quizButtonCorrect}
                                  ifWrongClass={styles.quizButtonWrong}
                                  style={{left: `${-300 * stage}px`, transition: `${0.15 + answersCounter}s ease`}}
                                  ifCorrectHandler={() => {
                                    if (lastQuestionAttended == stage) {
                             
                                      setMistakesCounter(mistakesCounter + 1);
                                    }
                                    setTimeout(() => {
                                      
                                    
                                      if (stage == count - 2) {
                                        const userScore = Math.trunc((count - 1 - mistakesCounter) / (count - 1)* 100);
                                        let quizResultText = null;
                                       
                                        if (userScore == 100) {
                                          quizResultText = "Так держать! Ты не допустил ни одной ошибки! Нащи уроки и учебные материалы помогут тебе поддерживать и повышать свой уровень знаний!"
                                        } else if (50 <= userScore && userScore < 100) {
                                          quizResultText = "Ты успешно прошел викторину! Были допущены одна или несколько ошибок, поэтому самое время ознакомится с нашими уроками по тем категориям, где ты ошибся! "
                                        } else if (userScore < 50) {
                                          quizResultText = "Спасибо за ответы! Тебе есть над чем поработать, поэтому смело выбирай категорию и начай изучать её уроки, чтобы повысить свой уровень знаний!"
                                        }
                                        quizQuestions[quizQuestions.length - 1] = {question: quizResultText, isLast: true};
                                        setQuizResultScore(userScore);
                                      } 
                                      
                                    
                                      setStage(stage + 1);
                                    }, 800);
                                    
                                  }}
                                  ifWrongHandler={() => {
                                    if (lastQuestionAttended != stage) {
                                      setLastQuestionAtended(stage)
                                    }
                                    
                                  }}
                                  ></TestButton>
                            {/* 
                            <button className={RubikMonoOne.className} style={{left: `${-300 * stage}px`, transition: `${0.15 + answersCounter}s ease`}} onClick={() => {
                              if (answer.id == question.correctAnswer) {
                                setCurrentCategory(quizQuestions[stage + 1].categoryId);
                                setStage(stage + 1);
                            
                                
                                
    
                              } else {
                                alert('Неверно');
                              }
                            }}>{answer.content}</button>*/}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div key={quizQuestions.length} className={styles.quizResultContentContainer} style={{left: `${-300 * stage}px`, transition: `${0.15}s ease`}}>
                      <div className={styles.progressBar}></div>
                      <SideNotice content={100} color={'#2B2B2B'} backgroundColor={'#D9D9D9'} customStyle={(windowWidth >= 750) ? {top: "-6px", left:'232px'} : {top: "5px", left:'224px'}} isReversed={false}></SideNotice>
                      <SideNotice content={50} color={'#2B2B2B'} backgroundColor={'#D9D9D9'} customStyle={(windowWidth >= 750) ? {top: `${(-6 + 300) / 2}px`, left:'232px'} : {top: '5px', left:`${(227) / 2 + 16}px`}} isReversed={false}></SideNotice>
                      <SideNotice content={0} color={'#2B2B2B'} backgroundColor={'#D9D9D9'} customStyle={(windowWidth >= 750) ?  {top: "302px", left:'232px'} : {top: "5px", left:'41px'}} isReversed={false}></SideNotice>
                      <SideNotice content={'Ты здесь!'} color={'#FFF'} backgroundColor={'#ff9742'} customStyle={(windowWidth >= 750) ? {top: `${302 - Math.trunc((6 + 302) * quizResultScore / 100)}px`, left:'0'} : {top: '70px', left: `${Math.trunc(50 + (200 * quizResultScore / 100) - 57)}px`}} isReversed={true}></SideNotice>
                    </div>
                  )
                }
                
                
                
              })}
            </div>
          </div>
            {(windowWidth >= 750) ? stage != count - 1 ? 
              (<div key={category.id} className={styles.questionImage} style={{backgroundImage: `url(${category.image})`, top: `calc(${category.top} - 4px)`, opacity: 1, animationName: `${styles.soar}`, animationDuration: "5s", animationIterationCount: "infinite"}}></div>)
              : (<div key={category.id} className={styles.questionImage} style={{backgroundImage: `url(${category.image})`, top: `calc(${category.top} -4px)`, transform: 'translateY(20px)', opacity: 0}}></div>)
              : null
            } 
            
        </div>
      )
  }