import {FC, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {ReactSVG} from "react-svg";

import {IToastProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

import close from "@assets/icons/close.svg";
import error from "@assets/icons/error.svg";
import checkCircle from "@assets/icons/check_circle.svg";

const Toast:FC<IToastProps> = ({text, time=6000, setToast, type="normal"}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toastRoot = document.getElementById("toast-hook");

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            setToast && setToast();
        }, time);
        return () => clearTimeout(timer);
    }, [time]);


    if (!toastRoot || !isVisible) return null;

    const toastContent = (
        <Container time={time} type={type}>
            <div>
                {type === "error" && <ReactSVG src={error}/>}
                {type === "success" && <ReactSVG src={checkCircle}/>}
                <p>{text}</p>
            </div>

            <div onClick={() => {
                setIsVisible(false);
                setToast && setToast();
            }}>
                <ReactSVG src={close}/>
            </div>
        </Container>
    );

    return ReactDOM.createPortal(toastContent, toastRoot);
};

export default Toast;