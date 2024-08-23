import {FC, useEffect, useRef} from "react";
import {Container, BottomSheetWrapper, PopupWrapper} from "./style.ts";
import {IModalProps} from "@/types/componentProps.ts";
import ReactDOM from "react-dom";

const Modal:FC<IModalProps> = ({content, setModal, type}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef, setModal]);

    const modalRoot = document.getElementById("modal-hook");

    if (!modalRoot) return null;

    const modalContent = (
        <Container>
            {type === "popup"
                ? <PopupWrapper ref={modalRef}>{content}</PopupWrapper>
                : <BottomSheetWrapper ref={modalRef}>
                    <div onClick={() => setModal(false)}/>
                    {content}
                </BottomSheetWrapper>
            }
        </Container>
    );

    return ReactDOM.createPortal(modalContent, modalRoot);
};

export default Modal;