import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";

export const Container = styled.div`
    width: 100%;

    h4 {
        width: 150px;
        line-height: 1.3;
        text-wrap: wrap;
        margin: 0;
        font-weight: 400;
        font-size: 1rem;
        color: ${({theme}) => theme.colors.font.main};
    }

    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-left: ${() => {
            const {lang} = useThemeStore();
            return lang === "ko" ? "36px" : "auto";
        }};
        margin-right: auto;
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