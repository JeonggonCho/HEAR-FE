import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";

export const Container = styled.div`
    position: relative;
    padding: 4px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;

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
            margin-left: 6px;
        }

        & > span:last-of-type {
            text-wrap: wrap;
            line-height: 1.3;
            word-break: break-all;
            font-size: 0.9rem;
        }
    }
`;

export const NameEmailWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;

    & > div:last-of-type {
        display: flex;
        flex-direction: column;
        gap: 8px;

        & > p {
            width: fit-content;
            margin: 0;
            font-size: 1.15rem;
            line-height: 1.3;
        }

        & > span {
            text-wrap: wrap;
            word-break: break-all;
            font-size: 0.87rem;
            color: ${({theme}) => theme.colors.font.sub};
        }
    }
`;