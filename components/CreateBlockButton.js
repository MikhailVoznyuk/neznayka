"use client"

export default function CreateBlockButton({handler, btnText}) {
   
    return <button onClick={() => handler()}>{btnText}</button>
}