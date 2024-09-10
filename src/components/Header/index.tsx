import React, {FC} from "react";

import {IHeaderProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

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