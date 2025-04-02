"use client"

import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

import HandlerButton from "@/components/button";
import { Rubik_Mono_One } from "next/font/google";
import { getCategories, getQuizQuestions, getAllFirstArticlesRels } from "@/components/server/pageEditor";
import TestButton from "@/components/buttons";
import SideNotice from "@/components/sidenotice";
import ModalWindow from "@/components/modalWindow";
import modalContext from "./modalContext";
import { UpdateWindowState } from "./modalContext";
import LoadingPlug from "@/components/loadingPlug";
import BookBlock from "@/components/bookBlock";
import { BookBlockMobile } from "@/components/bookBlock";
import StepsBlock from "@/components/userStepsBlock";
import { StepsBlockMobile } from "@/components/userStepsBlock";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCreative, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


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

function Quiz({modalWindowState, setModalWindowState, setModalWindowContent, scrollTop}) {
  
  const [stage, setStage] = React.useState(0);
  const [mistakesCounter, setMistakesCounter] = React.useState(0);
  const [quizQuestions, setQuizQuestions] = React.useState([]);
  const [quizCategories, setQuizCategories] = React.useState([]);
  const [currentCategory, setCurrentCategory] = React.useState(null);
  const [lastQuestionAttended, setLastQuestionAtended] = React.useState(-1);
  const [quizResultScore, setQuizResultScore] = React.useState(null);
  const [windowWidth, setWindowWidth] = React.useState(null);
  React.useEffect(() => {
    getQuizQuestions().then(e => {
      setQuizQuestions(e.concat({isLast: true})); 
      setCurrentCategory(e[stage].categoryId);
      let answersCount = 0;
     })
  }, []);
  React.useEffect(() => {
    getCategories().then(e => setQuizCategories(e));
  }, [])
  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
  });
  console.log(scrollTop)
  const count = quizQuestions.length;
  let quizBarSections = [];
  let quizBarLines = [];
  for (let i = 0; i < count; i++) {
    quizBarSections.push(i);
  }

    return (
      
      <div className={styles.quizWindow}>
        <div className={styles.quizWindowHeader}>
          <div className={[styles.quizBar, RubicMonoOne.className].join(' ')}>
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
              <h5 className={RubicMonoOne.className}>{quizQuestions[stage]?.question}</h5>
              <span></span>
          </div>
          <div className={[styles.quizResultContainer, RubicMonoOne.className].join(' ')} style={(quizResultScore != null) ? ((windowWidth >= 750) ? {top: '270px'} : {top: '350px'}) : {}}>
            <p>Твой результат:<br></br>{quizResultScore} из 100 баллов</p>
          </div>
          <div className={styles.quizConfirmButtonContainer} style={(quizResultScore != null) ? {opacity: 1, zIndex: 1, transform: 'translateY(0)'} : {}}>
              <button 
                className={[styles.quizConfirmButton, RubicMonoOne.className].join(' ')}
                onClick={() => {
                  
                  setModalWindowState(UpdateWindowState({
                    prevContext: modalWindowState,
                    state: false,
                    scrollTop: scrollTop
                  }));
                  setTimeout(() => setModalWindowContent(null), 500); 
                }}>Закончить тест</button>
          </div>
          <div className={styles.quizQuestionContainer} style={(quizResultScore != null && windowWidth < 750) ? {position: 'absolute', top: '20px'} : {}}>
          
            {quizQuestions.map(question => {
              if (!question.isLast) {
                let answersCounter = 0;
                let questionTried = false
                return (
                  <div key={question.id} className={[styles.quizQuestion, RubicMonoOne.className].join(' ')}>
                    
                    <div className={styles.questionBody}>
                      
                      {question.answers.map(answer => {
                        answersCounter += 0.15
                        return (
                          <div key={answer.id}>
                            <TestButton guess={answer.id}
                                buttonText = {answer.content}
                                answer={question.correctAnswer} 
                                basicClass={[RubicMonoOne.className]}
                                ifCorrectClass={styles.quizButtonCorrect}
                                ifWrongClass={styles.quizButtonWrong}
                                style={{left: `${((windowWidth >= 750) ? -320 : -300) * stage}px`, transition: `${0.15 + answersCounter}s ease`}}
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
                                    
                                    setCurrentCategory(quizQuestions[stage + 1]?.categoryId);
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
                          <button className={RubicMonoOne.className} style={{left: `${-300 * stage}px`, transition: `${0.15 + answersCounter}s ease`}} onClick={() => {
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
                  <div key={quizQuestions.length} className={styles.quizResultContentContainer} style={{left: `${((windowWidth >= 750) ? -320 : -300) * stage}px`, transition: `${0.15}s ease`, opacity: (quizResultScore == null) ? 0 : 1}}>
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
        {(windowWidth >= 750) ?
          quizCategories.map(category => {
                        
            let questionImage = null;
            if (currentCategory == category.id) {

              questionImage = (
                <div key={category.id} className={styles.questionImage} style={{backgroundImage: `url(${category.image})`, top: `calc(${category.top} + 0px)`, animationName: `${styles.soar}`, animationDuration: "5s", animationIterationCount: "infinite"}}></div>
              );
            } else {
              questionImage = (
                <div key={category.id} className={styles.questionImage} style={{backgroundImage: `url(${category.image})`, top: "120%"}}></div>
              )
            }
            return questionImage;
          }) : 
          null
        }

      </div>
    )
}

function QuizBlockModal({offsetY, modalState, modalBodyState}) {
  const [windowWidth, setWindowWidth] = React.useState(null);

  React.useEffect( () => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth))
  })


  const modalWindowContext = React.useContext(modalContext)

  return (
  <div className={styles.quizStatic} style={(windowWidth) >= 750 ? {height: '550px'} : {height: '550px'}}>
    <button className={styles.quizCloseBtn} onClick={() => {
        setModalWindowState(UpdateWindowState({state: false, setState : modalWindowContext.setState, scrollTop:offsetY, windowContent: <QuizBlockModal offsetY={0}/>}));
      }}>
      <span className={styles.btnLine} style={{transform: "rotate(45deg)"}}></span>
      <span className={styles.btnLine} style={{transform: "rotate(-45deg)"}}></span>
    </button>
    <Quiz></Quiz> 
  </div>
  )
}

function QuizStatic({modalWindowState, setModalWindowState, setModalWindowContent}) {
  const [windowWidth, setWindowWidth] = React.useState(null);
  console.log(modalWindowState)
  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
  })
  return (
    <div className={[styles.quizStatic, RubicMonoOne.className, 'flex justify-between'].join(' ')} style={modalWindowState.state ? {opacity: 0} : {}}>
        <div className={styles.quizStaticContent}>
          <h5>Пройдите 5-минутную викторину и проверьте свои знания!</h5>
          {(windowWidth < 856) ? 
            <div className={styles.quizSheetsContainer}>
            <div className={styles.quizSheet} style={{backgroundColor: "#FF8F34"}}>
              <Image className={styles.quizSheetImage} style={{top: "7px"}} src='/svetofor_mini.png' alt="quiz icon" width={70} height={70}></Image>
            </div>
            <div className={styles.quizSheet} style={{backgroundColor: "#47B0EE"}}>
              <Image className={styles.quizSheetImage} style={{top: "8px"}} src="/notebook_mini.png" alt="quiz icon" width={70} height={70}></Image>
            </div>
            <div className={styles.quizSheet} style={{backgroundColor: "#4C9B77"}}>
              <Image className={styles.quizSheetImage} style={{top: "7px", left: '4px'}} src="/fire_mini.png" alt="quiz icon" width={70} height={70}></Image>
            </div>
            <div className={styles.quizSheet} style={{backgroundColor: "#FF6064"}}>
      
              <Image className={styles.quizSheetImage} style={{top: "9px"}} src="/firetrack_mini.png" alt="quiz icon" width={70} height={70}></Image>
            
            </div>
            <div className={styles.quizSheet} style={{backgroundColor: "#63B8C5"}}>
              
              <Image className={styles.quizSheetImage} style={{top: "6.5px"}} src="/bus_stop_mini.png" alt="quiz icon" width={70} height={70}></Image>
            
            </div>
            <div className={styles.quizSheet} style={{backgroundColor: "#FF9064"}}>
              <Image className={styles.quizSheetImage} style={{top: "9px", left: "4.5px"}} src="/oven_mini.png" alt="quiz icon" width={70} height={70}></Image>
            </div>
            </div> : 
            null
          }
          <HandlerButton text={<div className={styles.btnContent}>
                <span className={styles.btnText}>Начать</span>
                <span className={styles.btnArrow}></span>
              </div>}
            eventHandler={() => {
              const offsetY = document.documentElement.scrollTop;
              setModalWindowState(UpdateWindowState({prevContext: modalWindowState, state: true, scrollTop: document.documentElement.scrollTop}));
              
              
              setModalWindowContent((
                <div className={styles.quizStatic} style={windowWidth >= 750 ? {height: '550px'} : {height: '530px'}}>
                  <button className={styles.quizCloseBtn} onClick={() => {
                      
                      console.log(offsetY);
                      setModalWindowState(UpdateWindowState({prevContext: modalWindowState, state:false, scrollTop: offsetY}));
                    }}>
                    <span className={styles.btnLine} style={{transform: "rotate(45deg)"}}></span>
                    <span className={styles.btnLine} style={{transform: "rotate(-45deg)"}}></span>
                  </button>
                  <Quiz modalWindowState={modalWindowState} setModalWindowState={setModalWindowState} setModalWindowContent={setModalWindowContent} scrollTop={offsetY}></Quiz> 
                </div>
              ))
            }}
          >
          </HandlerButton>
        
        </div>
        {(windowWidth >= 856) ? 
            <div className={styles.quizSheetsContainer}>
            <div className={styles.quizSheet} style={{backgroundColor: "#FF8F34"}}>
              <Image className={styles.quizSheetImage} style={{top: "8px"}} src='/svetofor_mini.png' alt="quiz icon" width={70} height={70}></Image>
            </div>
            <div className={styles.quizSheet} style={{backgroundColor: "#47B0EE"}}>
              <Image className={styles.quizSheetImage} style={{top: "8px"}} src="/notebook_mini.png" alt="quiz icon" width={70} height={70}></Image>
            </div>
            <div className={styles.quizSheet} style={{backgroundColor: "#4C9B77"}}>
              <Image className={styles.quizSheetImage} style={{top: "6px", left: '6px'}} src="/fire_mini.png" alt="quiz icon" width={70} height={70}></Image>
            </div>
            <div className={styles.quizSheet} style={{backgroundColor: "#FF6064"}}>
      
              <Image className={styles.quizSheetImage} style={{top: "12px"}} src="/firetrack_mini.png" alt="quiz icon" width={70} height={70}></Image>
            
            </div>
            <div className={styles.quizSheet} style={{backgroundColor: "#63B8C5"}}>
              
              <Image className={styles.quizSheetImage} style={{top: "8px"}} src="/bus_stop_mini.png" alt="quiz icon" width={70} height={70}></Image>
            
            </div>
            <div className={styles.quizSheet} style={{backgroundColor: "#FF9064"}}>
              <Image className={styles.quizSheetImage} style={{top: "12px"}} src="/oven_mini.png" alt="quiz icon" width={70} height={70}></Image>
            </div>
            </div> : 
            null
          }
      </div>
  );
}
export default function Page() {
  const [categories, setCategories] = React.useState(null);
  const [articlesPaths, setArticlesPaths] = React.useState(null);
  const [modalWindowState, setModalWindowState] = React.useState(React.useContext(modalContext));
  const [modalWindowContent, setModalWindowContent] = React.useState((<div></div>));
  const [isAnchorReached, setIsAnchorReached] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(1920);

 
  React.useEffect(() => {
    addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    })
    let loadedArticlesPaths;
    getCategories().then(categories => {
      setCategories(categories);
    });
    getAllFirstArticlesRels().then(allFirstArticlesRels => setArticlesPaths(allFirstArticlesRels));
    if (modalWindowState.scrollTop != 0) {
      setModalWindowState(UpdateWindowState({prevContext: modalWindowState, state: false, scrollTop: 0}))
    }
    }, []);
  React.useEffect(() => {
    console.log(document.documentElement.scrollTop, modalWindowState);
    setWindowWidth(window.innerWidth);
    if (modalWindowState.scrollTop != 0) {
      console.log('scroll', modalWindowState.scrollTop)
      window.scroll(0, modalWindowState.scrollTop);
      
    }
  
    
  })
  React.useEffect(() => {
    const route = window.location.hash;
    if (route.startsWith("#") && !isAnchorReached && categories != null &&  articlesPaths != null) {
      
      const element = document.querySelector(route);
      setTimeout(() =>  element.scrollIntoView({behavior: 'smooth'}), 0)
     
      setIsAnchorReached(true);
    }
  })
  console.log('windowWidth', windowWidth)
  let pageContent;
  if (categories != null &&  articlesPaths != null) {
    pageContent = (
      <main>
        <div className="container justify-center">
          {(windowWidth >= 600) ? 
            <BookBlock/> : 
            <BookBlockMobile/>
          }
    
        </div>
        <div className={["container justify-center section-title", RubicMonoOne.className].join(' ')}  id={'how-it-works'}>
          <h3>Как это работает</h3>
        </div>
        <div className="container justify-center">
          {(windowWidth >= 700) ?
            <StepsBlock
              steps={[
                {id: 0, title: "Играй", description: "Бросай кубик и делай ходы, выполняя задания поля, на которое ты пришел!", animation: "/animation/dice.lottie", animationStyle: {top: '-8px'}},
                {id: 1, title: "Учись", description: "Если ты не знаешь, как ответить на вопрос поля, то открывай этот справочник и переходи к соотвуствующему уроку!", animation: "/animation/book.lottie"},
                {id: 2, title: "Проверяй знания", description: "В конце каждого урока тебя ждет тест, чтобы ты оценил, насколько хорошо понял тему. Также ты можешь пройти викторину из случайных вопросов, чтобы оценить свои знания сразу по всем категориям!", animation: "/animation/arrow.lottie"},
              ]}
            /> : 
            <StepsBlockMobile 
              steps={[
                {id: 0, title: "Играй", description: "Бросай кубик и делай ходы, выполняя задания поля, на которое ты пришел!", animation: "/animation/dice.lottie", animationStyle: {top: '-16px', marginBottom: '-20px'}},
                {id: 1, title: "Учись", description: "Если ты не знаешь, как ответить на вопрос поля, то открывай этот справочник и переходи к соотвуствующему уроку!", animation: "/animation/book.lottie", animationStyle: {top: '-10px', marginBottom: '-50px'}},
                {id: 2, title: "Проверяй знания", description: "В конце каждого урока тебя ждет тест, чтобы ты оценил, насколько хорошо понял тему. Также ты можешь пройти викторину из случайных вопросов, чтобы оценить свои знания сразу по всем категориям!", animation: "/animation/arrow.lottie", animationStyle: {marginBottom: '10px'}} ,
              ]}
            />
          }
          
        </div>
        <div className={["container justify-center section-title", RubicMonoOne.className].join(' ')} id={'categories'}>
          <h3>Выбери категорию</h3>
        </div>
        <div className="container justify-center">
          {
            (windowWidth >= 750) ? 
            (
              <div className={styles.sheetsContainer}>
                {categories.map((cat) => {
                  
                  let categoryContentPath = articlesPaths[cat.rel] ? articlesPaths[cat.rel] : '/';
                  return (
                    <CategoryCard key={cat.id} rel={categoryContentPath} title={cat.title} backgroundColor={cat.backgroundColor} titleBackground={cat.titleColor} image={cat.image}></CategoryCard>
                    /*<Link href={`/categories/${cat.rel}`} className={styles.sheet} key={cat.id}
                    >
                      {cat.title}
                    </Link>*/
                  )
                })}    
              </div>  
            ) : 
            <div className="container justify-center">
              <Swiper
                className={styles.categorySlider}  style={{"--swiper-pagination-color" : "#FF9742", "--swiper-pagination-bullet-size": "12px", "--swiper-pagination-bullet-inactive-color" : "#2e4e80", '--swiper-pagination-bullet-inactive-opacity': 0.2}}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  clickable: true,
                  nextEl: '.gallery-swiper-button-next',
                  prevEl: '.gallery-swiper-button-prev',
                  disabledClass: 'gallery-swiper-button-disabled'
                }}
                pagination={{
                  clickable: true
                }}
                
                modules={[Pagination, EffectCreative, Navigation]}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                      shadow: false,
                      translate: [0, 0, -400],
                    },
                    next: {
                      translate: ['100%', 0, 0],
                    },
                  }}>
                {categories.map((cat) => {
                  
                  let categoryContentPath = articlesPaths[cat.rel] ? articlesPaths[cat.rel] : '/';
                  return (
                    <SwiperSlide key={cat.id} className={styles.categorySliderSlide} >
                      <CategoryCard  rel={categoryContentPath} title={cat.title} backgroundColor={cat.backgroundColor} titleBackground={cat.titleColor} image={cat.image}></CategoryCard>
                    </SwiperSlide>
               
                  )
                })}    
              </Swiper>
            </div>
          }
          
        </div>
        <div className="container justify-center" id={'test'}>
          <QuizStatic modalWindowState={modalWindowState} setModalWindowState={setModalWindowState} setModalWindowContent={setModalWindowContent}></QuizStatic>
        </div>
        <ModalWindow windowState={modalWindowState.state}>
           {modalWindowContent}
         </ModalWindow>
      </main>
    )
    
  } else {
    pageContent = (
     <LoadingPlug></LoadingPlug>
    )
  }
  return (
   pageContent
  );
}
