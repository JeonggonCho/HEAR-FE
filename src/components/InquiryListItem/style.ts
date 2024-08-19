import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";

export const Container = styled(NavLink)<{ category: "machine" | "reservation" | "room" | "etc" }>`
    width: 100%;
    display: inline-block;
    border-bottom: 1px solid #e2e2e2;
    padding: 12px 8px;
    transition: all 0.2s ease-in-out 0s;
    
    &:hover {
        transform: translateY(-4px);
        
        h3 {
            color: #2B65FC;
        }
    }
    
    & > span:first-child {
        font-size: 14px;
        margin-bottom: 8px;
        display: inline-block;
        padding: 4px 8px;
        background-color: #F0F4FF;
        color: #2B65FC;
        border-radius: 6px;
    }
    
    & > div:nth-child(2) {
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
    
    & > div:last-child {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        & > span:first-child {
            font-size: 16px;
        }
        
        & > span:last-child {
            font-size: 14px;
            color: #999999;
        }
    }
`;