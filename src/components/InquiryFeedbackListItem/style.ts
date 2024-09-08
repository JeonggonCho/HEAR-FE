import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const Container = styled(Link)<{ category: "machine" | "reservation" | "room" | "etc" | "good" | "bad" | "suggest"}>`
    width: 100%;
    display: inline-block;
    padding: 12px 8px;
    transition: all 0.2s ease-in-out 0s;
    
    & + & {
        border-top: 1px solid ${({theme}) => theme.colors.line.main};
    }

    h3 {
        color: ${({theme}) => theme.colors.font.main};
        margin: 0;
        font-size: 18px;
        font-weight: bold;
    }
    
    &:hover {
        transform: translateY(-4px);
        
        h3 {
            color: ${({theme}) => theme.colors.font.primary};
        }
    }
    
    & > span:first-of-type {
        font-size: 14px;
        margin-bottom: 8px;
        display: inline-block;
        color: ${({theme}) => theme.colors.font.sub};
        border-radius: 6px;
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 18px;
        
        span {
            font-size: 14px;
            padding: 6px 8px;
            background-color: ${({theme}) => theme.colors.button.third};
            border-radius: 6px;
            color: ${({theme}) => theme.colors.font.sub};
        }
    }
    
    & > div:last-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        & > span:first-of-type {
            font-size: 16px;
            color: ${({theme}) => theme.colors.font.sub};
        }
        
        & > span:last-of-type {
            font-size: 14px;
            color: ${({theme}) => theme.colors.font.sub};
        }
    }
`;