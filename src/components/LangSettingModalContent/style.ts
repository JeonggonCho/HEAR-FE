import styled from "@emotion/styled";
import {darken, lighten} from "polished";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    
    & > div:first-child {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 6px;
        margin-bottom: 40px;
        
        h3 {
            font-weight: bold;
            font-size: 20px;
            margin: 0;
        }
        
        & > div:nth-child(2) {
            cursor: pointer;
            
            svg {
                fill: #999999;
                transition: all 0.2s ease-in-out 0s;
                
                &:hover {
                    fill: black;
                    transform: scale(1.05);
                }
            }
        }
    }
    
    & > div:nth-child(2) {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 80px;
        
        input {
            display: none;
        }
        
        input[type="radio"]:checked + label {
            color: #2B65FC;
            border: 1px solid #2B65FC;
            background-color: #F0F4FF;
            
            svg {
                display: inline;
                fill: #2B65FC;
            }
        }
        
        label {
            display: flex;
            height: 48px;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            font-size: 20px;
            border: 1px solid #E2E2E2;
            border-radius: 8px;
            padding: 0 16px;
            cursor: pointer;
            color: #999999;
            transition: all 0.2s ease-in-out 0s;
            
            &:hover {
                color: ${lighten(0.1, "#2B65FC")};
                border: 1px solid ${lighten(0.1, "#2B65FC")};
            }
            
            svg {
                display: none;
            }
        }
    }

    & > button:last-child {
        margin: auto;
        display: block;
        border: none;
        background: none;
        text-align: center;
        color: #2B65FC;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.2s ease-in-out 0s;
        
        &:hover {
            color: ${darken(0.1, "#2B65FC")};
        }
    }
`;