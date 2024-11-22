import React, {forwardRef, ReactNode} from "react";
import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";
import ModalHeader from "@components/common/Modal/ModalHeader.tsx";
import ModalBody from "@components/common/Modal/ModalBody.tsx";
import ModalFooter from "@components/common/Modal/ModalFooter.tsx";
import ModalPortal from "@components/common/Modal/ModalPortal.tsx";


const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-50%) scale(0.8);
    }
    100% {
        opacity: 1;
        transform: translateX(-50%) scale(1);
    }
`;

const ModalWrapper = styled.div`
    padding: 12px;
    height: auto;
    max-width: 80%;
    min-width: 55%;
    border-radius: 16px;
    background-color: ${({theme}) => theme.colors.bg.main};
    color: ${({theme}) => theme.colors.font.main};
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: 40px;
    animation: ${fadeIn} 0.3s;

    @media (max-width: 600px) {
        max-width: calc(100vw - 40px);
    }
`;

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
});