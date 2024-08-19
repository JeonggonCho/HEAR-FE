import React, {FC} from "react";
import {Container} from "./style.ts";
import {IHeaderProps} from "@/types/componentProps.ts";

const Header: FC<IHeaderProps> = ({leftChild, centerText, rightChild}) => {
    return (
        <Container>
            <div>{leftChild}</div>
            <div>{centerText}</div>
            <div>{rightChild}</div>
        </Container>
    );
};

export default React.memo(Header);