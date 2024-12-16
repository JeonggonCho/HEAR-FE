import ReactDOM from "react-dom";
import Icon from "@components/common/Icon";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import logo from "@assets/logo.svg";


const SplashPage = () => {
    const splashRoot = document.getElementById("splash-hook");

    const {lang} = useThemeStore();

    if (!splashRoot) return null;

    const splash = (
        <Container>
            <div>
                <div>
                    <span>{messageCategories.school[lang]}<br/>{messageCategories.splashMessage[lang]}</span>
                    <div>
                        <Icon svg={logo} size={56}/>
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