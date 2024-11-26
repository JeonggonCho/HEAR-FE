import {ReactNode} from "react";

interface IHeaderLeftProps {
    children?: string | ReactNode;
}

const HeaderLeft = ({children}: IHeaderLeftProps) => {
    return (
        <div>{children}</div>
    );
};

export default HeaderLeft;