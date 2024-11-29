import styled from "@emotion/styled";

export const CardWrapper = styled.div<{
    padding: string | number,
    bgColor: boolean,
    borderRadius: number | string
}>`
    padding: ${({padding}) => typeof padding === "number" ? `${padding}px` : padding};
    background-color: ${({bgColor, theme}) => bgColor ? theme.colors.bg.main : theme.colors.bg.sub};
    border-radius: ${({borderRadius}) => typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius};
`;