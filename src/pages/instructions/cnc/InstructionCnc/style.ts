import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";

export const MachineImgWrapper = styled.div`
    width: 130px;
    height: 130px;
    overflow: hidden;
    margin: auto auto 18px;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const Container = styled.div`
    background-color: ${({theme}) => {
        const {isDarkMode} = useThemeStore();
        return isDarkMode && theme.colors.bg.sub;
    }};
    
    & > div:first-of-type {
        background-color: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? theme.colors.bg.sub : theme.colors.bg.main;
        }};
    }
    
    & > div:nth-of-type(3),
    & > div:nth-of-type(4) {
        margin-left: 24px;
        margin-right: 24px;
    }
`;