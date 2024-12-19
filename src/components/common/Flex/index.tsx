import {CSSProperties, ReactNode} from "react";


interface IFlexProps {
    children: ReactNode;
    direction?: "row" | "column";
    justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
    align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
    wrap?: "nowrap" | "wrap" | "wrap-reverse";
    gap?: string | number;
    style?: CSSProperties;
    onClick?: () => void;
}


const Flex = (
    {
        children,
        direction = "row",
        justify = "flex-start",
        align = "stretch",
        wrap = "nowrap",
        gap = 0,
        style,
        onClick,
        ...props
    }: IFlexProps) => {
    return (
        <div
            onClick={onClick}
            style={{
                display: "flex",
                flexDirection: direction,
                justifyContent: justify,
                alignItems: align,
                flexWrap: wrap,
                gap: typeof gap === "number" ? `${gap}px` : gap,
                cursor: onClick && "pointer",
                ...style,
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Flex;