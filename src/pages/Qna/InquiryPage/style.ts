import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";
import {darken, lighten} from "polished";

export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    
    img {
        width: 36px;
    }
`;

export const Container = styled.div`
    width: 100%;
    min-height: 100%;
    position: relative;
`;

export const CreateBtnWrapper = styled.div`
    position: fixed;
    bottom: 112px;
    width: 100%;
    max-width: 600px;
    padding-right: 64px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const CreateBtn = styled(NavLink)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #2B65FC;
    transition: all 0.2s ease-in-out 0s;
    
    &:hover {
        background-color: ${lighten(0.1, "#2B65FC")};
        transform: scale(1.05);
    }
    
    &:active {
        background-color: ${darken(0.1, "#2B65FC")};
        transform: scale(0.8);
    }
`;