import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import ColoredBtn from "@components/ColoredBtn";

import {Container} from "./style.ts";

const NotFoundPage = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"404 페이지"}/>
            <p>해당 페이지를 찾을 수 없습니다</p>
            <ColoredBtn type={"link"} content={"홈으로 이동"} width={"full"} color={"primary"} scale={"big"} to={"/"}/>
        </Container>
    );
};

export default NotFoundPage;