'use client'

export default function Button({eventHandler}) {

    return (
        <button onClick={() => eventHandler()}>Тык</button>
    )
}