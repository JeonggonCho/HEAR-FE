import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    margin: 28px auto 0 auto;
    display: inline-block;
    text-align: center;
`;

export const LinkWrapper = styled(Link)<{color: "primary" | "second"}>`
    cursor: pointer;
    color: ${({color, theme}) => color === "primary" ? theme.colors.font.primary : theme.colors.font.sub};
    transition: all 0.2s ease-in-out 0s;
`;