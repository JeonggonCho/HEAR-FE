import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";
import {lighten} from "polished";

export const Container = styled(NavLink)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background-color: white;
    padding: 12px;
    border-radius: 16px;
    border: 1px solid white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease-in-out 0s;
    
    h4 {
        margin: 0;
    }
    
    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        color: #999999;
    }
    
    svg {
        fill: #999999;
        transition: all 0.2s ease-in-out 0s;

        &:hover {
            fill: black;
            transform: scale(1.05);
        }
    }
    
    &:hover {
        box-shadow: none;
        border: 1px solid #2B65FC;
        background-color: ${lighten(0.4, "#2B65FC")};
        
        h4 {
            color: #2B65FC;
        }
    }
    
    &:active {
        background-color: ${lighten(0.3, "#2B65FC")};
        transform: scale(0.8);
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 20px;
    }
`;

export const MachineImgWrapper = styled.div`
    width: 56px;
    height: 56px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;