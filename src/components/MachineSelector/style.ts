import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";
import {lighten} from "polished";

export const Container = styled(NavLink)`
    height: 100%;
    background-color: white;
    border-radius: 16px;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    padding-top: 8px;
    padding-bottom: 16px;
    gap: 8px;
    transition: all 0.2s ease-in-out 0s;

    span {
        font-size: 16px;
    }

    &:hover {
        box-shadow: none;
        border: 1px solid #2B65FC;
        background-color: ${lighten(0.4, "#2B65FC")};

        span {
            color: #2B65FC;
        }
    }

    &:active {
        background-color: ${lighten(0.2, "#2B65FC")};
    }
`;

export const MachineImgWrapper = styled.div`
    width: 112px;
    height: 112px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;