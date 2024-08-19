import {FC} from 'react';
import {Container} from "./style.ts";
import {IEmptyProps} from "@/types/componentProps.ts";

const Empty:FC<IEmptyProps> = ({image, title, message}) => {
    return (
        <Container>
            {image && <img src={image} alt="빈 내용"/>}
            <p>{title}</p>
            <p>{message}</p>
        </Container>
    );
};

export default Empty;