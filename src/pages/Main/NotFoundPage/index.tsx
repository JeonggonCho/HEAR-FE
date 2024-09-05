import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import ColoredBtn from "@components/ColoredBtn";

import {useAuthStore} from "@store/useAuthStore.ts";

import {Container} from "./style.ts";

import logo from "@assets/images/404_logo.png";

const NotFoundPage = () => {
    const {isLoggedIn} = useAuthStore();

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"404 페이지"}/>
            <div>
                <img src={logo}/>
            </div>
            <p>해당 페이지를 찾을 수 없습니다</p>
            <ColoredBtn type={"link"} content={isLoggedIn ? "홈으로 이동" : "로그인 하기"} width={"full"} color={"primary"} scale={"big"} to={"/"}/>
        </Container>
    );
};

export default NotFoundPage;