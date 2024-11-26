import {ReactNode} from "react";

interface IHeaderRightProps {
    children?: string | ReactNode;
}

const HeaderRight = ({children}: IHeaderRightProps) => {
    return (
        <div>{children}</div>
    );
};

export default HeaderRight;