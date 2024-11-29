import {ReactNode} from "react";


interface ICardFooterProps {
    children: ReactNode | string;
}


const CardFooter = ({children}: ICardFooterProps) => {
    return (
        <div>{children}</div>
    );
};

export default CardFooter;