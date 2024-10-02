import {FC} from 'react';

import {ILinkProps} from "@/types/componentProps.ts";

import {Container, LinkWrapper} from "./style.ts";

const Link:FC<ILinkProps> = ({text, to, color}) => {
    return (
        <Container>
            <LinkWrapper to={to} color={color}>{text}</LinkWrapper>
        </Container>
    );
};

export default Link;