import React from "react"

const modalWindowContext = React.createContext({
    prevContext: {},
    state: false,
    scrollTop: 0
});

export default modalWindowContext;

export function UpdateWindowState({prevContext, state=false, scrollTop=0}) {
    let newContext = {};
    newContext.state = state,
    newContext.scrollTop = scrollTop;
    newContext.setState = prevContext.setState;
    prevContext.setState(newContext);
    return newContext;
}



