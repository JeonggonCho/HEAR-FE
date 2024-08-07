import styled from "@emotion/styled";
import {lighten} from "polished";

export const Container = styled.div`
    width: 100%;
    background-color: ${lighten(0.38, "#2B65FC")};
    border-radius: 16px;
    padding: 18px;
    
    h3 {
        margin-top: 0;
    }
    
    div {
        display: flex;
        justify-content: space-between;
        
        & > span:last-child {
            color: #999999;
        }
    }
`;