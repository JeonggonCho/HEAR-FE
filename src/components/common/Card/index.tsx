import {ReactNode} from "react";
import CardHeader from "@components/common/Card/CardHeader.tsx";
import CardBody from "@components/common/Card/CardBody.tsx";
import CardFooter from "@components/common/Card/CardFooter.tsx";
import {CardWrapper} from "@components/common/Card/style.ts";


interface ICardProps {
    children: ReactNode | string;
    padding: string | number;
    bgColor: boolean;
    borderRadius: number | string;
}


const CardMain = (
    {
        children,
        padding,
        bgColor,
        borderRadius,
    }: ICardProps
) => {

    return (
        <CardWrapper
            padding={padding}
            bgColor={bgColor}
            borderRadius={borderRadius}
        >
            {children}
        </CardWrapper>
    );
};

export const Card = Object.assign(CardMain, {
    Header: CardHeader,
    Body: CardBody,
    Footer: CardFooter,
});