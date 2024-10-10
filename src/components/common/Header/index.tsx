import React, {FC} from "react";

import {IHeaderProps} from "@/types/componentProps.ts";

import {CenterTextWrapper, Container, LeftChildWrapper, RightChildWrapper} from "./style.ts";

const Header: FC<IHeaderProps> = ({leftChild, centerText, rightChild, type="grid"}) => {
    return (
        <Container type={type}>
            {leftChild && <LeftChildWrapper>{leftChild}</LeftChildWrapper>}
            {centerText && <CenterTextWrapper>{centerText}</CenterTextWrapper>}
            {rightChild && <RightChildWrapper>{rightChild}</RightChildWrapper>}
        </Container>
    );
};

export default React.memo(Header);