import {ReactNode} from "react";
import ReactDOM from "react-dom";

interface IModalPortalProps {
    children?: ReactNode;
}

const ModalPortal = ({children}: IModalPortalProps) => {
    const modalRoot = document.getElementById("modal-hook");

    const portalContent = (
        <>{children}</>
    );

    if (!modalRoot) return null;

    return ReactDOM.createPortal(portalContent, modalRoot);
};

export default ModalPortal;