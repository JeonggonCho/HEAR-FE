import {FC, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {ReactSVG} from "react-svg";

import {useToastStore} from "@store/useToastStore.ts";

import {Container} from "./style.ts";

import close from "@assets/icons/close.svg";
import error from "@assets/icons/error.svg";
import checkCircle from "@assets/icons/check_circle.svg";

const Toast:FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const {text, type, hideToast} = useToastStore();

    const toastRoot = document.getElementById("toast-hook");

    useEffect(() => {
        if (text) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                hideToast();
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [text, hideToast]);

    if (!toastRoot || !isVisible) return null;

    const toastContent = (
        <Container time={6000} type={type}>
            <div>
                {type === "error" && <ReactSVG src={error}/>}
                {type === "success" && <ReactSVG src={checkCircle}/>}
                <p>{text}</p>
            </div>

            <div onClick={() => {
                setIsVisible(false);
                hideToast();
            }}>
                <ReactSVG src={close}/>
            </div>
        </Container>
    );

    return ReactDOM.createPortal(toastContent, toastRoot);
};

export default Toast;