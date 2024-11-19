import {FC} from "react";

import {IConfirmContentProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";


const ModalConfirmContent:FC<IConfirmContentProps> = ({text, description, leftBtn, rightBtn, content}) => {
    return (
        <Container>
            <p>{text}</p>
            <p>{description}</p>

            <div>
                {content}
            </div>

            <div>
                {leftBtn} {rightBtn}
            </div>
        </Container>
    );
};

export default ModalConfirmContent;