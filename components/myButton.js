"use client"

export default function MyButton({handler}) {
   
    return <button onClick={() => handler()}>кнопка</button>
}