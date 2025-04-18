import {useEffect} from "react";
import ReactDOM from "react-dom";
import Icon from "@components/common/Icon";
import {useToastStore} from "@store/useToastStore.ts";
import {Container} from "./style.ts";
import close from "@assets/icons/close.svg";
import error from "@assets/icons/error.svg";
import checkCircle from "@assets/icons/check_circle.svg";


const TOAST_DISPLAY_TIME = 6000;


const Toast = () => {
    const {text, type, hideToast, key} = useToastStore();
    const toastRoot = document.getElementById("toast-hook");

    useEffect(() => {
        const timer = setTimeout(hideToast, TOAST_DISPLAY_TIME);
        return () => clearTimeout(timer);
    }, [text, hideToast]);

    if (!toastRoot || !text) return null;

    const toastContent = (
        <Container key={key} time={TOAST_DISPLAY_TIME} type={type}>
            <div>
                {type === "error" && <Icon svg={error}/>}
                {type === "success" && <Icon svg={checkCircle}/>}
                <p>{text}</p>
            </div>

            <div onClick={hideToast}>
                <Icon svg={close}/>
            </div>
        </Container>
    );

    return ReactDOM.createPortal(toastContent, toastRoot);
};

export default Toast;