import React, {forwardRef, ReactNode} from "react";
import ModalHeader from "@components/common/Modal/ModalHeader.tsx";
import ModalBody from "@components/common/Modal/ModalBody.tsx";
import ModalFooter from "@components/common/Modal/ModalFooter.tsx";
import ModalPortal from "@components/common/Modal/ModalPortal.tsx";
import ModalTrigger from "@components/common/Modal/ModalTrigger.tsx";
import {ModalWrapper} from "@components/common/Modal/style.ts";


interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

const ModalMain = forwardRef<HTMLDivElement, IModalProps>(({ children, ...props }, ref) => {
    return (
        <ModalWrapper
            ref={ref}
            {...props}
        >
            {children}
        </ModalWrapper>
    );
});

export const Modal = Object.assign(ModalMain, {
    Header: ModalHeader,
    Body: ModalBody,
    Footer: ModalFooter,
    Portal: ModalPortal,
    Trigger: ModalTrigger,
});