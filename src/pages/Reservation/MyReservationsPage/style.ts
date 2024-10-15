import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";

export const ReservationListItemWrapper = styled.div`
    margin: 8px 24px;
`;

export const ReservationControlWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 28px;
    position: sticky;
    top: 72px;
    gap: 12px;
    background-color: ${({theme}) => theme.colors.bg.sub};

    @media (max-width: 530px) {
        align-items: end;
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;

        @media (max-width: 530px) {
            gap: 12px;
            align-items: start;
            flex-direction: ${() => {
                const {lang} = useThemeStore();
                return lang === "en" ? "column" : "row";
            }}
        }
        
        // 선택 예약취소
        & > div:last-of-type {
            & > span {
                font-size: 0.9rem;
                text-decoration: underline;
                color: ${({theme}) => theme.colors.font.sub};
                cursor: pointer;
                transition: all 0.2s ease-in-out 0s;
                
                &:hover {
                    color: ${({theme}) => theme.colors.font.main};
                }
            }
        }
    }
    
    & > select {
        margin-left: auto;
        padding: 4px;
        border-radius: 6px;
        border: 1px solid ${({theme}) => theme.colors.line.main};
        font-size: 0.9rem;
        color: ${({theme}) => theme.colors.font.main};
        background-color: ${({theme}) => theme.colors.bg.main};
        
        &:focus {
            outline: 1px solid ${({theme}) => theme.colors.line.primary};
        }
    }
`;

export const SelectAllWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    
    label {
        font-size: 0.9rem;
        cursor: pointer;
    }
    
    input[type="checkbox"] {
        display: none;

        &:checked + label {
            background-color: ${({theme}) => theme.colors.button.primary};
            border: 2px solid ${({theme}) => theme.colors.line.primary};

            svg {
                display: block;
            }
        }
    }

    input[type="checkbox"] + label {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid ${({theme}) => theme.colors.font.sub};
        border-radius: 4px;

        svg {
            display: none;
            width: 16px;
            fill: white;
        }
    }
    
    span {
        font-size: 0.9rem;
        text-decoration: none;
        color: ${({theme}) => theme.colors.font.main};
    }
`;