import {FC} from 'react';
import {Container, LinkWrapper} from "./style.ts";
import {To} from "react-router-dom";

interface ILinkProps {
    text: String;
    to: To;
    color: "primary" | "second";
}

const Link:FC<ILinkProps> = ({text, to, color}) => {
    return (
        <Container>
            <LinkWrapper to={to} color={color}>{text}</LinkWrapper>
        </Container>
    );
};

export default Link;