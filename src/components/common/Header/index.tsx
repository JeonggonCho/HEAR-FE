import React, {FC} from "react";

import {IHeaderProps} from "@/types/componentProps.ts";

import {CenterTextWrapper, Container, LeftChildWrapper, RightChildWrapper} from "./style.ts";

const Header: FC<IHeaderProps> = ({leftChild, centerText, rightChild, type="grid", bgColor=false}) => {
    return (
        <Container type={type} bgColor={bgColor}>
            <LeftChildWrapper>{leftChild}</LeftChildWrapper>
            <CenterTextWrapper>{centerText}</CenterTextWrapper>
            <RightChildWrapper>{rightChild}</RightChildWrapper>
        </Container>
    );
};

export default React.memo(Header);