import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";
import {lighten} from "polished";

export const Container = styled.div`
    width: calc(100% + 48px);
    margin-left: -24px;
    padding: 8px 0;
    background-color: ${({theme}) => theme.colors.bg.main};

    // 캐로젤 영역
    & > div:first-of-type {
        // 캐로젤 컨텐츠 영역

        & > div:first-of-type {
            height: 100%;
            margin-top: 12px;
            margin-bottom: 36px;

            // 각각의 컨텐츠
            & > div {
                width: 80% !important;
                padding: 20px;
                border-radius: 20px;
                background-color: ${({theme}) => theme.colors.bg.main};
                border: 1px solid ${({theme}) => {
                    const {isDarkMode} = useThemeStore();
                    return isDarkMode ? theme.colors.line.main : lighten(0.02, theme.colors.line.main);
                }};
                box-shadow: 0 0 10px ${({theme}) => {
                    const {isDarkMode} = useThemeStore();
                    return isDarkMode ? theme.colors.bg.shadow : lighten(0.5, theme.colors.bg.shadow);
                }};
            }
        }

        // 왼쪽 화살표 버튼

        & > div:nth-of-type(2) {
            height: 100%;
            margin-left: -4px;
            top: 0 !important;
            color: ${({theme}) => theme.colors.font.sub};
            transition: all 0.2s ease-in-out 0s;

            &:hover {
                scale: 1.05;
                color: ${({theme}) => theme.colors.font.main};
            }

            &:active {
                scale: 0.85;
            }

            &:after {
                font-size: 1.5rem;
            }

            @media (max-width: 500px) {
                display: none;
            }
        }

        // 오른쪽 화살표 버튼

        & > div:nth-of-type(3) {
            height: 100%;
            margin-right: -4px;
            top: 0 !important;
            color: ${({theme}) => theme.colors.font.sub};
            transition: all 0.2s ease-in-out 0s;

            &:hover {
                scale: 1.05;
                color: ${({theme}) => theme.colors.font.main};
            }

            &:active {
                scale: 0.85;
            }

            &:after {
                font-size: 1.5rem;
            }

            @media (max-width: 500px) {
                display: none;
            }
        }

        // 페이지네이션 영역

        & > div:nth-of-type(4) {
            & > span {
                background-color: ${({theme}) => theme.colors.font.sub};
            }
        }
    }
`;