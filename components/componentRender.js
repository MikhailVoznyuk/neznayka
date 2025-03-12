import ArticleBlock from "./article/modules";

export default class PageRender {
    constructor(isDev) {
        this.isDev = isDev;
    }
    renderComponent(component) {
        return (
            <ArticleBlock component={component} isDev={this.isDev}></ArticleBlock>
        )
    }
}