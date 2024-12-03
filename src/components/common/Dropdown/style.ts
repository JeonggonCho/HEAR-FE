import styled from "@emotion/styled";
import {lighten} from "polished";


export const DropdownMenuWrapper = styled.ul`
    position: absolute;
    padding: 6px 0;
    top: 12px;
    right: 0;
    border-radius: 6px;
    background-color: ${({theme}) => lighten(0.1, theme.colors.bg.main)};
    box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
    display: flex;
    flex-direction: column;
    z-index: 2;
`;

export const DropdownItemWrapper = styled.li`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px 10px 12px;
    transition: all 0.1s ease-in-out 0s;
    cursor: pointer;
    font-size: 0.9rem;
    text-wrap: nowrap;
    color: ${({theme}) => theme.colors.font.sub};

    &:hover {
        background-color: ${({theme}) => theme.colors.button.third};
    }

    svg {
        width: 20px;
        height: 20px;
        fill: ${({theme}) => lighten(0.2, theme.colors.icon.fill)};
    }
`;