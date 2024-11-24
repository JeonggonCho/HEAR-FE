import React, {MouseEvent, ReactNode} from "react";

import {Modal} from "@components/common/Modal/Modal.tsx";
import Backdrop from "@components/common/Backdrop";

interface IConfirmModalProps extends React.HTMLAttributes<HTMLDivElement> {
    header: ReactNode;
    subMessage?: string;
    children?: ReactNode;
    footer?: ReactNode;
    onClose?: (e: MouseEvent) => void;
    modalRef?: React.Ref<HTMLDivElement>;
    backdropRef?: React.Ref<HTMLDivElement>;
}

const ConfirmModal = (
    ({
         header,
         subMessage = "",
         children = null,
         footer,
         onClose,
         modalRef,
         backdropRef,
         ...props
    }: IConfirmModalProps) => {
        return (
            <Modal.Portal>
                <Backdrop ref={backdropRef}>
                    <Modal ref={modalRef} {...props}>
                        <Modal.Header>{header}</Modal.Header>
                        {subMessage}
                        <Modal.Body>{children}</Modal.Body>
                        <Modal.Footer>{footer}</Modal.Footer>
                    </Modal>
                </Backdrop>
            </Modal.Portal>
        );
    }
);

export default ConfirmModal;