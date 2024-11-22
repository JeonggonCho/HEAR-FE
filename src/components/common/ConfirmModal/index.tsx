import React, {MouseEvent, ReactNode} from "react";

import {Modal} from "@components/common/Modal/Modal.tsx";
import Backdrop from "@components/common/Backdrop";


interface IConfirmModalProps extends React.HTMLAttributes<HTMLDivElement> {
    message: string;
    subMessage?: string;
    children?: ReactNode;
    footer?: ReactNode;
    onClose?: (e: MouseEvent) => void;
}

const ConfirmModal = (
    ({ message, subMessage = "", children = null, footer, onClose, ...props }: IConfirmModalProps) => {
        return (
            <Modal.Portal>
                <Backdrop onClick={onClose}>
                    <Modal {...props}>
                        <Modal.Header>{message}</Modal.Header>
                        {subMessage && <p>{subMessage}</p>}
                        <Modal.Body>{children}</Modal.Body>
                        <Modal.Footer>{footer}</Modal.Footer>
                    </Modal>
                </Backdrop>
            </Modal.Portal>
        );
    }
);


export default ConfirmModal;