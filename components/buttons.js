import React from "react";

export default function TestButton({buttonText, guess, answer, ifCorrectHandler, ifWrongHandler, basicClass, ifCorrectClass, ifWrongClass, style}) {
    
    const [buttonClass, setButtonClass] = React.useState([...basicClass]);
    
    return (
        <button className={buttonClass.join(' ')} style={style} onClick={() => {
            if (guess == answer) {
                setButtonClass(buttonClass.concat(ifCorrectClass));
                ifCorrectHandler();
            } else {
                setButtonClass(buttonClass.concat(ifWrongClass));
                ifWrongHandler();
            }
        }}>{buttonText}</button>
    )
}