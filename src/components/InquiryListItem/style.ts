import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const Container = styled(Link)<{ category: "machine" | "reservation" | "room" | "etc" }>`
    width: 100%;
    display: inline-block;
    padding: 12px 8px;
    transition: all 0.2s ease-in-out 0s;
    
    & + & {
        border-top: 1px solid #e2e2e2;
    }
    
    &:hover {
        transform: translateY(-4px);
        
        h3 {
            color: #2B65FC;
        }
    }
    
    & > span:first-of-type {
        font-size: 14px;
        margin-bottom: 8px;
        display: inline-block;
        color: #2B65FC;
        border-radius: 6px;
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 18px;
        
        h3 {
            margin: 0;
            font-size: 18px;
            font-weight: bold;
        }
        
        span {
            font-size: 14px;
            padding: 6px 8px;
            background-color: #EFEFEF;
            border-radius: 6px;
            color: #999999;
        }
    }
    
    & > div:last-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        & > span:first-of-type {
            font-size: 16px;
        }
        
        & > span:last-of-type {
            font-size: 14px;
            color: #999999;
        }
    }
`;