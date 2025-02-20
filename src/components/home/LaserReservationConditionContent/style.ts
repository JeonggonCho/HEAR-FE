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
        color: ${({theme}) => theme.colors.font.main};
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
        margin-bottom: 12px;

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

    & > div:nth-of-type(2) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & > div:last-child {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: 24px;
        padding: 4px 4px 4px 28px;
        border-radius: 6px;
        transition: all 0.2s ease-in-out 0s;

        &:hover {
            background-color: ${({theme}) => theme.colors.button.third};

            & > p {
                z-index: 5;
                cursor: pointer !important;
                color: ${({theme}) => theme.colors.font.main};
            }

            svg {
                fill: ${({theme}) => theme.colors.font.main};
            }
        }

        & > p {
            margin: 0 8px 0 0;
            color: ${({theme}) => theme.colors.font.sub};
            transition: all 0.2s ease-in-out 0s;
        }

        svg {
            fill: ${({theme}) => theme.colors.icon.fill};
            transition: all 0.2s ease-in-out 0s;
        }
    }
`;

export const ReservationListWrapper = styled.div<{ isOpen: boolean; maxHeight: string }>`
    max-height: ${(props) => (props.isOpen ? props.maxHeight : "0")};
    transition: max-height 0.3s ease-in-out;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
`;

export const ReservationStatusWrapper = styled.div`
    margin-top: 24px;
    
    label {
        display: block;
        color: ${({theme}) => theme.colors.font.main};
        margin-bottom: 12px;
        margin-left: 4px;
    }
    
    & > div:last-of-type {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        
        @media (max-width: 580px) {
            grid-template-columns: repeat(3, 1fr);
        }
    }
`;

export const TimeStamp = styled.div<{status: boolean}>`
    text-align: center;
    text-wrap: nowrap;
    margin: 2px;
    padding: 8px 6px;
    background-color: ${({theme, status}) => status ? theme.colors.bg.main : theme.colors.button.third};
    font-size: 0.85rem;
    border-radius: 6px;
    border: 1px solid ${({theme, status}) => status ? theme.colors.line.main : theme.colors.button.third};
    color: ${({theme, status}) => status ? theme.colors.font.main : theme.colors.font.sub};
    gap: 4px;
`;