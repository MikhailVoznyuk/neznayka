import React from "react"

const modalWindowContext = React.createContext({
    state: false,
    setState: ()=>{}, 
    scrollTop: 0,
    backgoundContainerNeeded: true, 
    windowContent: (<div></div>)
});

export default modalWindowContext;

export function UpdateWindowState({curContext, newState = null, scrollTop=null, backgoundContainerNeeded=null, content=null}) {
    
    curContext.state = (newState===null ? curContext.state : newState);
    curContext.scrollTop = (scrollTop===null ? curContext.scrollTop : scrollTop);
    curContext.backgoundContainerNeeded= (backgoundContainerNeeded===null ? curContext.backgoundContainerNeeded : backgoundContainerNeeded);
    curContext.windowContent = (content===null ? curContext.windowContent : content);
    curContext.setState(curContext);
}



