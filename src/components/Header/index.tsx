import {FC, ReactNode} from "react";
import {Container} from "./style.ts";

interface HeaderProps {
    leftChild?: ReactNode;
    centerChild?: ReactNode;
    rightChild?: ReactNode;
}

const Header: FC<HeaderProps> = ({leftChild, centerChild, rightChild}) => {
    return (
        <Container>
            <div>{leftChild}</div>
            <div>{centerChild}</div>
            <div>{rightChild}</div>
        </Container>
    );
};

export default Header;