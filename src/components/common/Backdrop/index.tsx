import React, {MouseEvent, ReactNode} from "react";
import styled from "@emotion/styled";


const BackdropWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);
    width: 600px;
    height: 100%;
    background: rgba(100, 100, 100, 0.5);
    backdrop-filter: blur(2px);
    z-index: 5;
`;

interface IBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    onClick?: (e: MouseEvent) => void;
}

const Backdrop = ({children, onClick, ...props}: IBackdropProps) => {
    return (
        <BackdropWrapper
            onClick={onClick}
            {...props}
        >
            {children}
        </BackdropWrapper>
    );
};

export default Backdrop;