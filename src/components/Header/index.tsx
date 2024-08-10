import {FC, ReactNode} from "react";
import {Container} from "./style.ts";

interface IHeaderProps {
    leftChild?: ReactNode;
    centerText?: string;
    rightChild?: ReactNode;
}

const Header: FC<IHeaderProps> = ({leftChild, centerText, rightChild}) => {
    return (
        <Container>
            <div>{leftChild}</div>
            <div>{centerText}</div>
            <div>{rightChild}</div>
        </Container>
    );
};

export default Header;