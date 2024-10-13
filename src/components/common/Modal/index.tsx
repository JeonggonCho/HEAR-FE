import {FC, useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import {ReactSVG} from "react-svg";

import {IModalProps} from "@/types/componentProps.ts";

import close from "@assets/icons/close.svg";

import {Container, BottomSheetWrapper, PopupWrapper} from "./style.ts";

const Modal:FC<IModalProps> = ({title, content, setModal, type}) => {
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
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setModal(false);
                    }}/>
                    <div>
                        <h3>{title}</h3>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            setModal(false);
                        }}>
                            <ReactSVG src={close}/>
                        </div>
                    </div>
                    {content}
                </BottomSheetWrapper>
            }
        </Container>
    );

    return ReactDOM.createPortal(modalContent, modalRoot);
};

export default Modal;