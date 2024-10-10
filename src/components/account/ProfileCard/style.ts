import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";

export const Container = styled.div`
    width: 100%;
    border-radius: 16px;
    padding: 18px;
    background-color: ${({theme}) => theme.colors.bg.main};
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    margin-top: 8px;
    
    & > div {
        display: flex;
        align-items: start;
        gap: 12px;
        color: ${({theme}) => theme.colors.font.main};

        & > span:first-of-type {
            width: ${() => {
                const {lang} = useThemeStore();
                return lang === "en" ? "80px" : "68px"
            }};
            color: ${({theme}) => theme.colors.font.sub};
            font-size: 0.9rem;
            line-height: 1.3;
        }
        
        & > span:last-of-type {
            text-wrap: wrap;
            line-height: 1.3;
            word-break: break-all;
            font-size: 0.9rem;
        }
    }
`;