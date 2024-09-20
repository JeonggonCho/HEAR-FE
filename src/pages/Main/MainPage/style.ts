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
    font-size: 28px;
    font-weight: 600;
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
    p {
        line-height: 1.5;
        margin: 0 0 24px 6px;
        color: ${({theme}) => theme.colors.font.main};
    }

    & > div:nth-of-type(2),
    & > div:nth-of-type(3),
    & > a:nth-of-type(1) {
        margin-bottom: 16px;
    }

    & > div:nth-of-type(4) {
        display: grid;
        grid-gap: 16px;
        grid-template-columns: 1fr 1fr;
    }
`;