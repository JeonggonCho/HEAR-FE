import {FC} from "react";

import {IConfirmContentProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";


const ModalConfirmContent:FC<IConfirmContentProps> = ({text, description, leftBtn, rightBtn, additionalComponent}) => {
    return (
        <Container>
            <p>{text}</p>
            <p>{description}</p>

            <div>
                {additionalComponent}
            </div>

            <div>
                {leftBtn} {rightBtn}
            </div>
        </Container>
    );
};

export default ModalConfirmContent;