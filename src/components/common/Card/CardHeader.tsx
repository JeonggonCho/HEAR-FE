import {ReactNode} from "react";


interface ICardHeaderProps {
    children: ReactNode | string;
}


const CardHeader = ({children}: ICardHeaderProps) => {
    return (
        <div>{children}</div>
    );
};

export default CardHeader;