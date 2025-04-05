'use client'

import React from "react";
import Image from "next/image";
import RubikMonoOne from "@/components/fonts/rubikMonoOne";
import { RubikBold } from "@/components/fonts/rubikMonoOne";
import styles from './page.module.css';

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import AnimationAppearWrapper from "@/components/animationAppearWrapper";

export default function Page() {
    const [windowWidth, setWindowWidth] = React.useState(null);
    const [textFieldHeight, setTextFieldHeight] = React.useState(null);
    const [isFormSend, setIsFormSend] = React.useState(false);
    React.useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    })
    return (
        <>  
        
            <div className='section-title text-md' style={{margin: '-20px 0'}}>
                 <h2 className={RubikMonoOne.className} style={{fontSize: '36px'}}>Контакты</h2>
            </div>
            <div className={['container flex-column', RubikBold.className].join(' ')}>
                <div className='flex justify-center' style={{columnGap: '140px'}}>
                    <AnimationAppearWrapper className={styles.bookForm}>
                    
                        <div className={[styles.bookPage, styles.bookPageContent].join(' ')} style={{top: '16px', left: '16px', backgroundColor: '#2e4e80'}}></div>
                        <div className={styles.bookPage} style={{top: '12px', left: '12px'}} ></div>
                        <div className={styles.bookPage} style={{top: '8px', left: '8px'}}></div>
                        <div className={styles.bookPage} style={{top: '4px', left: '4px'}} ></div>
                        <div className={[styles.bookPage].join(' ')} style={{top: 0, left: 0, backgroundColor: '#2e4e80'}}>
                            <div className={[styles.bookPageContent, 'flex', 'flex-column'].join(' ')}>
                                    <h5 className={'mb-30'}>{isFormSend ? 'Спасибо! Мы получили вашу форму и свяжемся с вами как только ее обработаем!' : 'Заполните форму и мы свяжемся с вами в ближайшее время!'}</h5>
                                    {
                                        (isFormSend) ?
                                        <div className={['flex justify-center align-center', styles.formAnimation].join(' ')}>
                                            <DotLottieReact
                                                src="/animation/email-file.json"
                                                autoplay
                                            />
                                        </div> :
                                        <form className={'gform flex flex-column'} method="POST" action={'https://script.google.com/macros/s/AKfycbxOa-cmNTN9dQlVAGf5rwryqm8LhFVzbz8MeQNFAd9l3rozMHa9z-RB9gJpYhR_MQFUbA/exec'} onSubmit={e => {
                                            function getFormData(form) {
                                                var elements = form.elements;
                                                var honeypot;
                                            
                                                var fields = Object.keys(elements).filter(function(k) {
                                                if (elements[k].name === "honeypot") {
                                                    honeypot = elements[k].value;
                                                    return false;
                                                }
                                                return true;
                                                }).map(function(k) {
                                                if(elements[k].name !== undefined) {
                                                    return elements[k].name;
                                                }else if(elements[k].length > 0){
                                                    return elements[k].item(0).name;
                                                }
                                                }).filter(function(item, pos, self) {
                                                return self.indexOf(item) == pos && item;
                                                });
                                            
                                                var formData = {};
                                                fields.forEach(function(name){
                                                var element = elements[name];
                                                
                                                // singular form elements just have one value
                                                formData[name] = element.value;
                                            
                                                // when our element has multiple items, get their values
                                                if (element.length) {
                                                    var data = [];
                                                    for (var i = 0; i < element.length; i++) {
                                                    var item = element.item(i);
                                                    if (item.checked || item.selected) {
                                                        data.push(item.value);
                                                    }
                                                    }
                                                    formData[name] = data.join(', ');
                                                }
                                                });
                                            
                                                // add form-specific values into the data
                                                formData.formDataNameOrder = JSON.stringify(fields);
                                                formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
                                                formData.formGoogleSendEmail
                                                = form.dataset.email || ""; // no email by default
                                            
                                                return {data: formData, honeypot: honeypot};
                                            }
                                            e.preventDefault();
                                            const form = e.target
                                            const formData = getFormData(form);
                                            const data = formData.data;

                                            const url = form.action;
                                            const xhr = new XMLHttpRequest();
                                            xhr.open('POST', url);
                                            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                            const encoded = Object.keys(data).map(function(k) {
                                                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
                                            }).join('&');
                                            xhr.send(encoded);
                                            setIsFormSend(true);
                                        }}>
                                        <input className={'g'}name='name' placeholder="Ваше имя"></input>
                                        <input name='phone' placeholder="Ваш номер телефона"></input>
                                        <input name='email' placeholder="Ваша почта"></input>
                                        <textarea name='message' placeholder={'Коротко опишите суть вопроса'} style={{height: `${textFieldHeight}px`}} onChange={(e) => {setTextFieldHeight(e.target.scrollHeight)}}>
                                        </textarea>
                                        <button type='submit'>Отправить</button>
                                    </form>
                                    }
                                    
                            </div>
                        </div>
                        <Image className={styles.formParticle} src='/icons/rivets.svg' width={40} height={80} alt='' style={{top: '50px', left: '-16px'}}></Image>
                        <Image className={styles.formParticle} src='/icons/notes_sm.svg' width={30} height={50} alt='' style={{top: '0px', left: '80%', display: (windowWidth < 400) ? 'none' : null}}></Image>

                    </AnimationAppearWrapper>
                    <AnimationAppearWrapper className={[`flex flex-column ${(windowWidth <= 400) ? 'align-center' : ''}`, styles.contactsColumn].join(' ')}>
                        <h5 className={'mb-20 text-xl'}>Или используйте для связи любой из наших контактов:</h5>
                        <div className={['flex text-md align-center text-xl', styles.columnRow].join(' ')}>
                            <Image src='/icons/phone.svg' width={30} height={30} alt=''></Image>
                            <span>+7(777)777-77-77</span>
                        </div>
                        <div className={['flex text-md align-center text-xl mb-20', styles.columnRow].join(' ')}>
                            <Image src='/icons/email.svg' width={30} height={30} alt=''></Image>
                            <span>example@domain.com</span>
                        </div>
                    </AnimationAppearWrapper>
                        
                </div>
            </div>
        </>
       
    )
}