import React, {FC} from "react";
import {Container} from "./style.ts";

interface IConfirmModalContentProps {
    text: string;
    description?: string;
    leftBtn: React.ReactElement;
    rightBtn: React.ReactElement;
}

const ConfirmModalContent:FC<IConfirmModalContentProps> = ({text, description, leftBtn, rightBtn}) => {
    return (
        <Container>
            <p>{text}</p>
            <p>{description}</p>
            <div>
                {leftBtn} {rightBtn}
            </div>
        </Container>
    );
};

export default ConfirmModalContent;