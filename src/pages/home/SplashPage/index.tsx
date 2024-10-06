import {FC} from "react";
import ReactDOM from "react-dom";
import {ReactSVG} from "react-svg";

import {useThemeStore} from "@store/useThemeStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {Container} from "./style.ts";

import logo from "@assets/logo.svg";

const SplashPage:FC = () => {
    const splashRoot = document.getElementById("splash-hook");

    const {lang} = useThemeStore();

    if (!splashRoot) return null;

    const splash = (
        <Container>
            <div>
                <div>
                    <span>{messageCategories.school[lang]}<br/>{messageCategories.splashMessage[lang]}</span>
                    <div>
                        <ReactSVG src={logo}/>
                        <h1>HEAR</h1>
                    </div>
                </div>

                <span>Copyright 2024. 조정곤 all rights reserved.</span>
            </div>
        </Container>
    );

    return ReactDOM.createPortal(splash, splashRoot);
};

export default SplashPage;