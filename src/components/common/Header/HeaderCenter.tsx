import {ReactNode} from "react";


interface IHeaderCenterProps {
    children?: string | ReactNode;
}


const HeaderCenter = ({children}: IHeaderCenterProps) => {
    return (
        <div>{children}</div>
    );
};

export default HeaderCenter;