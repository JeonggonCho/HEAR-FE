import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {lighten} from "polished";

export const Container = styled.div`
    width: 100%;
    margin: 28px auto 0 auto;
    display: inline-block;
    text-align: center;
`;

export const LinkWrapper = styled(Link)<{color: "primary" | "second"}>`
    cursor: pointer;
    color: ${({color}) => color === "primary" ? "#2B65FC" : "#999999"};
    transition: all 0.2s ease-in-out 0s;
    
    &:hover {
        color: ${({color}) => color === "primary" ? lighten(0.15, "#2B65FC") : lighten(0.15, "#999999")};
    }
`;