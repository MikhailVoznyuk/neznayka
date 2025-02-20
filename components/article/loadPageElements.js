import TextBlock from "./modules";
import {ImageBlock, VideoBlock} from "./modules"

export default function getBlock({id, type, content}, dev) {
    if (type == 0) {
        return (
        <TextBlock key={id} isDev={dev} textContent={content}></TextBlock>
        );
    } else if (type == 1) {
        return (
            <ImageBlock key={id} isDev={dev} imgUrl={content}></ImageBlock>
        );
    } else if (type == 2) {
        return (
            <VideoBlock key={id} isDev={dev} vidioUrl={content}></VideoBlock>
        )
    }
    
}