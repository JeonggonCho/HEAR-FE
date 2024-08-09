import {FC, ReactNode} from "react";
import {Container} from "./style.ts";

interface HeaderProps {
    leftChild?: ReactNode;
    centerText?: string;
    rightChild?: ReactNode;
}

const Header: FC<HeaderProps> = ({leftChild, centerText, rightChild}) => {
    return (
        <Container>
            <div>{leftChild}</div>
            <div>{centerText}</div>
            <div>{rightChild}</div>
        </Container>
    );
};

export default Header;