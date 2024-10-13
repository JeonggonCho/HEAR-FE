import {FC} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Button from "@components/common/Button";

import {useAuthStore} from "@store/useAuthStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {Container} from "./style.ts";

import logo from "@assets/images/404_logo.png";

const NotFoundPage:FC = () => {
    const {isLoggedIn} = useAuthStore();
    const {lang} = useThemeStore();

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"404"}/>
            <div>
                <div>
                    <img src={logo}/>
                </div>
                <p>{messageCategories.emptyPage[lang]}</p>
                <Button type={"link"} content={isLoggedIn ? buttonCategories.goHome[lang] : buttonCategories.signIn[lang]} width={"full"} color={"primary"}
                        scale={"big"} to={"/"}/>
            </div>
        </Container>
    );
};

export default NotFoundPage;