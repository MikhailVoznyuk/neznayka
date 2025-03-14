import ArticleBlock from "./article/modules";

export default class PageRender {
    constructor({isDev, categoryContent}) {
        this.isDev = isDev;
        this.categoryContent = categoryContent;
    }
    renderComponent({articleId, component, modalWindowState, setModalWindowState, setModalWindowContent, offsetY, completedBlocks, setCompletedBlocks}) {
        return (
            <ArticleBlock
                articleId={articleId}
                modalWindowState={modalWindowState} 
                component={component} 
                categoryContent = {this.categoryContent}
                isDev={this.isDev}
                setModalWindowState={setModalWindowState} 
                setModalWindowContent={setModalWindowContent} 
                offsetY={offsetY}
                completedBlocks={completedBlocks}
                setCompletedBlocks={setCompletedBlocks}
                >  
            </ArticleBlock>
        )
    }
}