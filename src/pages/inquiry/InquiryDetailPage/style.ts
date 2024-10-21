import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";
import {darken, lighten} from "polished";

export const Container = styled.div`
    & > div:first-of-type {
        width: 100%;
    }
`;

export const InquiryWrapper = styled.div`
    border-radius: 12px;
    padding: 16px 8px 8px;
    margin: 0 24px;
    background-color: ${({theme}) => theme.colors.bg.main};
`;

export const InquiryInfoWrapper = styled.div`
    padding: 0 8px;
    
    & > div:first-of-type {
        display: flex;
        flex-direction: column;
        gap: 12px;
        
        & > div:first-of-type {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        // 제목
        & > h2 {
            font-size: 1.25rem;
            font-weight: 500;
            margin: 0 0 12px;
            text-wrap: wrap;
            word-break: break-all;
            line-height: 1.5;
        }
    }
    
    & > div:last-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: ${({theme}) => theme.colors.font.sub};
    }
`;

export const ContentWrapper = styled.div`
    padding: 24px 8px;

    & > p:first-of-type {
        margin: 0;
        font-size: 1rem;
        line-height: 1.8;
        text-wrap: wrap;
        word-break: break-all;
        color: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? lighten(0.2, theme.colors.font.sub) : darken(0.3, theme.colors.font.sub);
        }};
    }
`;

export const DateWrapper = styled.span`
    font-size: 0.85rem;
    margin-left: 12px;
`;

export const CountsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-grow: 1;
    justify-content: end;
    
    & > div {
        display: flex;
        align-items: center;
        gap: 4px;
        
        svg {
            width: 16px;
            margin-top: 4px;
            fill: ${({theme}) => theme.colors.icon.fill};
        }

        span {
            font-size: 0.9rem;
        }
    }
`;

export const BtnsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    border-top: 1px solid ${({theme}) => theme.colors.line.main};
    color: ${({theme}) => theme.colors.font.sub};
    font-size: 0.9rem;

    & > div {
        margin-top: 8px;
        border-radius: 6px;
        padding: 6px 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.2s ease-in-out 0s;
        
        & > span {
            transition: all 0.2s ease-in-out 0s;
        }
        
        &:hover {
            background-color: ${({theme}) => theme.colors.button.third};
            
            svg, span {
                scale: 1.05;
            }
        }
        
        &:active {
            svg, span {
                scale: 0.8;
            }
        }
    }
`;

export const LikeBtnWrapper = styled.div<{isLiked: boolean}>`
    svg {
        margin-top: 2px;
        width: 20px;
        height: 20px;
        transition: all 0.2s ease-in-out 0s;
        fill: ${({theme, isLiked}) => isLiked ? theme.colors.font.primary : theme.colors.icon.fill};
    }
    
    & > span {
        color: ${({theme, isLiked}) => isLiked ? theme.colors.font.primary : theme.colors.font.sub};
        font-weight: ${({isLiked}) => isLiked ? 500 : 400};
    }
`;

export const CommentBtnWrapper = styled.div`
    svg {
        fill: ${({theme}) => theme.colors.icon.fill};
        margin-top: 2px;
        width: 20px;
        height: 20px;
        transition: all 0.2s ease-in-out 0s;
    }
`;

export const CommentFormWrapper = styled.form`
    display: flex;
    gap: 12px;
    margin: 36px 24px 40px;
    
    & > div:first-of-type {
        margin-top: 5px;
    }
`;

export const CommentListWrapper = styled.div`
    margin: 0 24px;
`;

export const EmptyMessage = styled.p`
    margin-top: 56px;
    text-align: center;
    color: ${({theme}) => theme.colors.font.sub};
`;

export const TextareaWrapper = styled.div<{textLength: number}>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 8px;
    height: ${({textLength}) => textLength > 0 ? "auto" : "40px"};
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 8px;
    padding: 6px;
    overflow: hidden;
    border: 1px solid ${({theme}) => theme.colors.line.main};

    &:focus-within {
        outline: 1px solid ${({theme}) => theme.colors.line.primary};
        height: auto;
    }
    
    & > div {
        textarea {
            padding: 0;
            background: none;
            border-radius: 0;
            width: 100%;
            border: none;
            
            &:focus {
                outline: none;
            }
        }
    }
    
    button {
        margin-left: auto;
        padding: 2px 10px;
    }
`;