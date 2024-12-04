import {ReactNode} from "react";
import ReactDOM from "react-dom";


interface IBottomSheetPortalProps {
    children?: ReactNode;
}


const BottomSheetPortal = ({children}: IBottomSheetPortalProps) => {
    const bottomSheetRoot = document.getElementById("modal-hook");

    const portalContent = (
        <>{children}</>
    );

    if (!bottomSheetRoot) return null;

    return ReactDOM.createPortal(portalContent, bottomSheetRoot);
};

export default BottomSheetPortal;