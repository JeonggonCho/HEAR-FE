import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {useThemeStore} from "@store/useThemeStore.ts";
import {darken, lighten} from "polished";

export const HeaderElementWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const LogoWrapper = styled.div`
    width: 36px;
    height: 36px;
    margin-right: 12px;
`;

export const Logo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Title = styled.h1`
    font-size: 1.75rem;
    font-weight: 500;
    color: ${({theme}) => theme.colors.font.primary};
`;

export const AlarmWrapper = styled(Link)`
    width: 32px;
    margin-right: 6px;
    margin-top: 2px;
    cursor: pointer;
    
    svg {
        display: inline-block;
        fill: ${({theme}) => theme.colors.icon.fill};
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.2s ease-in-out 0s;
        
        &:hover {
            fill: ${({theme}) => {
                const {isDarkMode} = useThemeStore();
                return isDarkMode ? lighten(0.2, theme.colors.icon.fill) : darken(0.2, theme.colors.icon.fill)
            }};
        }
    }
`;

export const ThemeWrapper = styled.div`
    width: 32px;
    margin-top: 2px;
    cursor: pointer;

    svg {
        display: inline-block;
        fill: ${({theme}) => theme.colors.icon.fill};
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.2s ease-in-out 0s;

        &:hover {
            fill: ${({theme}) => {
                const {isDarkMode} = useThemeStore();
                return isDarkMode ? lighten(0.2, theme.colors.icon.fill) : darken(0.2, theme.colors.icon.fill)
            }};
        }
    }
`;

export const Container = styled.div`
    & > div:first-of-type {
        background-color: ${({theme}) => theme.colors.bg.main} !important;
    }
    
    & > div:first-of-type,
    & > div:nth-of-type(2),
    & > div:nth-of-type(3),
    & > div:nth-of-type(4),
    & > div:nth-of-type(5) {
        margin-bottom: 16px !important;
    }

    & > div:last-of-type {
        display: grid;
        grid-gap: 16px;
        grid-template-columns: 1fr 1fr;
    }
`;