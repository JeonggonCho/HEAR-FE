import {FC} from "react";
import {Container} from "./style.ts";
import {IConfirmModalContentProps} from "@/types/componentProps.ts";

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