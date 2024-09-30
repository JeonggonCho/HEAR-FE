import {FC} from "react";

import {IConfirmContentProps} from "@types/componentProps.ts";

import {Container} from "./style.ts";

const ConfirmContent:FC<IConfirmContentProps> = ({text, description, leftBtn, rightBtn}) => {
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

export default ConfirmContent;