import {ReactNode} from "react";


interface ICardBodyProps {
    children: ReactNode | string;
}


const CardBody = ({children}: ICardBodyProps) => {
    return (
        <div>{children}</div>
    );
};

export default CardBody;