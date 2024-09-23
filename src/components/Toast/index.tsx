import {FC, useEffect, useState} from "react";
import ReactDOM from "react-dom";

import {IToastProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

const Toast:FC<IToastProps> = ({text, time, setToast}) => {
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
        <Container>{text}</Container>
    );

    return ReactDOM.createPortal(toastContent, toastRoot);
};

export default Toast;