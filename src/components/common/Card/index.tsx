import {ElementType, ReactNode} from "react";
import {useTheme} from "@emotion/react";


interface ICardProps {
    children: ReactNode | string;
    padding: string | number;
    borderRadius: number | string;
    as?: ElementType;
    bgColor?: "main" | "sub";
    style?: Object;
}


const Card = (
    {
        children,
        padding,
        borderRadius,
        as: Component = "div",
        bgColor = "main",
        style = {},
    }: ICardProps
) => {
    const theme = useTheme();

    return (
        <Component
            style={{
                padding: `${typeof padding === "number" ? `${padding}px` : padding}`,
                borderRadius: `${typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius}`,
                backgroundColor: theme.colors.bg[bgColor],
                ...style,
            }}
        >
            {children}
        </Component>
    );
};

export default Card;