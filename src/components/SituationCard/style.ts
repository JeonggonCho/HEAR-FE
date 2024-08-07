import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";

export const Container = styled(NavLink)`
    width: 100%;
    padding: 18px;
    border-radius: 16px;
    background-color: white;
    transition: all 0.2s ease-in-out 0s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        
        h3 {
            color: #2B65FC;
        }
        
        svg {
            fill: black;
            transform: scale(1.05);
        }
    }
    
    h3 {
        transition: all 0.2s ease-in-out 0s;
    }
    
    svg {
        fill: #999999;
        transition: all 0.2s ease-in-out 0s;
    }
`;