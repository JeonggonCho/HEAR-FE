import {FC} from 'react';
import {Container, LinkWrapper} from "./style.ts";
import {ILinkProps} from "@/types/componentProps.ts";

const Link:FC<ILinkProps> = ({text, to, color}) => {
    return (
        <Container>
            <LinkWrapper to={to} color={color}>{text}</LinkWrapper>
        </Container>
    );
};

export default Link;