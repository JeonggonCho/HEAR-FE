import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {lighten} from "polished";

export const Container = styled(Link)`
    height: 100%;
    background-color: white;
    border-radius: 16px;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 16px;
    gap: 8px;
    transition: all 0.2s ease-in-out 0s;

    span {
        font-size: 16px;
    }

    &:hover {
        border: 1px solid #2B65FC;
        background-color: ${lighten(0.4, "#2B65FC")};

        span {
            color: #2B65FC;
        }
    }

    &:active {
        background-color: ${lighten(0.3, "#2B65FC")};
        transform: scale(0.8);
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