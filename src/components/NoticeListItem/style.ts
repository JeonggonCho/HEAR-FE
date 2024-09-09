import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const Container = styled(Link)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 8px;
    transition: all 0.2s ease-in-out 0s;

    & > div:first-of-type {
        width: 90%;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    h3 {
        color: ${({theme}) => theme.colors.font.main};
        margin: 0;
        font-size: 18px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    span {
        font-size: 14px;
        color: ${({theme}) => theme.colors.font.sub};
    }
    
    & + & {
        border-top: 1px solid ${({theme}) => theme.colors.line.main};
    }

    &:hover {
        transform: translateY(-4px);

        h3 {
            color: ${({theme}) => theme.colors.font.primary};
        }
    }
`;