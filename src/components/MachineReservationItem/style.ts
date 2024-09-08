import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const Container = styled(Link)`
    height: 100%;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 16px;
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 16px;
    gap: 8px;
    transition: all 0.2s ease-in-out 0s;

    span {
        color: ${({theme}) => theme.colors.font.main};
        font-size: 16px;
    }

    &:hover {
        border: 1px solid ${({theme}) => theme.colors.line.primary};
        background-color: ${({theme}) => theme.colors.button.approval};

        span {
            color: ${({theme}) => theme.colors.font.primary};
        }
    }

    &:active {
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