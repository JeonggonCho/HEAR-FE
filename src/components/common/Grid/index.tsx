import React, { ReactNode } from "react";

interface IGridProps {
    children: ReactNode;
    columns?: number | string;
    rows?: number | string;
    gap?: string | number;
    justify?: "start" | "center" | "end" | "stretch" | "space-between" | "space-around" | "space-evenly";
    align?: "start" | "center" | "end" | "stretch";
    style?: React.CSSProperties;
}

const Grid = ({
                  children,
                  columns = "auto",
                  rows = "auto",
                  gap = 0,
                  justify = "stretch",
                  align = "stretch",
                  style,
                  ...props
              }: IGridProps) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: typeof columns === "number" ? `repeat(${columns}, 1fr)` : columns,
                gridTemplateRows: typeof rows === "number" ? `repeat(${rows}, auto)` : rows,
                gap: typeof gap === "number" ? `${gap}px` : gap,
                justifyContent: justify,
                alignItems: align,
                ...style,
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Grid;
