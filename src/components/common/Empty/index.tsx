import {Container} from "./style.ts";


interface IEmptyProps {
    image?: string;
    title: string;
    message?: string;
}


const Empty = ({image, title, message}: IEmptyProps) => {
    return (
        <Container>
            {image && <img src={image} alt="빈 내용"/>}
            <p>{title}</p>
            <p>{message}</p>
        </Container>
    );
};

export default Empty;