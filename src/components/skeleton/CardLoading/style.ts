import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";
import {darken} from "polished";
import {useThemeStore} from "@store/useThemeStore.ts";

const skeletonWave = keyframes`
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
`;

export const Container = styled.div<{widthValue: string, heightValue: string, bgColor: "dark" | "light"}>`
    width: ${({ widthValue }) => widthValue};
    height: ${({ heightValue }) => heightValue};
    background: ${({theme, bgColor}) => {
        const {isDarkMode} = useThemeStore();
        return bgColor === "dark" ?
                `linear-gradient(90deg, ${theme.colors.button.third} 0%, ${(theme.colors.bg.main)} 25%, ${theme.colors.button.third} 50%, ${theme.colors.button.third} 100%)`
                : `linear-gradient(90deg, ${theme.colors.bg.main} 0%, ${isDarkMode ? theme.colors.button.third : darken(0.03, theme.colors.button.third)} 25%, ${theme.colors.bg.main} 50%, ${theme.colors.bg.main} 100%)`
    }};
    background-size: 200% 100%;
    border-radius: 16px;
    animation: ${skeletonWave} 2s infinite linear;
`;