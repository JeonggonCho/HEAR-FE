import React, {ReactNode} from "react";


interface IFlexProps {
    children: ReactNode;
    direction?: "row" | "column";
    justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
    align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
    wrap?: "nowrap" | "wrap" | "wrap-reverse";
    gap?: string | number;
    style?: React.CSSProperties;
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
        ...props
    }: IFlexProps) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: direction,
                justifyContent: justify,
                alignItems: align,
                flexWrap: wrap,
                gap: typeof gap === "number" ? `${gap}px` : gap,
                ...style,
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Flex;