import {FC} from "react";
import ReactDOM from "react-dom";
import {ReactSVG} from "react-svg";

import {Container} from "./style.ts";

import logo from "@assets/logo.svg";

const SplashPage:FC = () => {
    const splashRoot = document.getElementById("splash-hook");

    if (!splashRoot) return null;

    const splash = (
        <Container>
            <div>
                <div>
                    <span>한양대 에리카 건축학부<br/>모형제작실 예약은 여기!</span>
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