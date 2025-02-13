import TextBlock from "./article/modules";

export default class PageRender {
    constructor(isDev) {
        this.isDev = isDev;
    }
    renderComponent(component) {
        let componentType = component.type;
        if (componentType == 0) {
            return (
            <TextBlock isDev={this.isDev} textContent={component.content}></TextBlock>
            )
        }
        else {
            return <div>Empty Block</div>
        }
    }
}