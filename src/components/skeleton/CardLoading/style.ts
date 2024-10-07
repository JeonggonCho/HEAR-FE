import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";

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
    background: ${({theme, bgColor}) => bgColor === "dark" ?
            `linear-gradient(90deg, ${theme.colors.button.third} 0%, ${theme.colors.bg.main} 10%, ${theme.colors.button.third} 15%, ${theme.colors.button.third} 100%)`
            :`linear-gradient(90deg, ${theme.colors.bg.main} 0%, ${theme.colors.bg.sub} 10%, ${theme.colors.bg.main} 15%, ${theme.colors.bg.main} 100%)`};
    background-size: 200% 100%;
    border-radius: 16px;
    animation: ${skeletonWave} 2.5s infinite ease-in-out 0.2s;
`;