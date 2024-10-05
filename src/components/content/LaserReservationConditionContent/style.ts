import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";

export const Container = styled.div`
    width: 100%;
    
    h4 {
        width: 160px;
        text-wrap: wrap;
        line-height: 1.3;
        margin: 0;
        font-weight: 400;
        font-size: 1rem;
        color: ${({theme}) => theme.colors.font.sub};
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: ${() => {
            const {lang} = useThemeStore();
            return lang === "ko" ? "-12px" : lang === "en" ? "10px" : "0px";
        }};
        gap: 12px;
        margin-bottom: 24px;
        
        & > div:first-of-type {
            width: 48px;
            height: 48px;
            overflow: hidden;
            
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    
    & > div:last-of-type {
        
    }
`;