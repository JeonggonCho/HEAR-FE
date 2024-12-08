import {ReactNode} from "react";


interface IHeaderRightProps {
    children?: string | ReactNode;
}


const HeaderRight = ({children}: IHeaderRightProps) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end"
        }}>
            {children}
        </div>
    );
};

export default HeaderRight;