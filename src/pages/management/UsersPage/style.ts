import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";
import {darken, lighten} from "polished";

export const Container = styled.div<{usernameInputText: string}>`
    width: 100%;
    position: relative;
    
    & > div:nth-of-type(2) {
        width: calc(100% + 48px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 28px;
        margin-left: -24px;
        position: sticky;
        top: 80px;
        background-color: ${({theme}) => theme.colors.bg.sub};
        z-index: 3;
        
        & > span:first-of-type {
            font-size: 16px;
        }
        
        & > form:first-of-type {
            display: flex;
            align-items: center;
            gap: 8px;
            
            // 유저 이름 검색 관련
            & > div:first-of-type {
                position: relative;
                display: flex;
                align-items: center;
                border: 1px solid ${({theme}) => theme.colors.line.main};
                background-color: ${({theme}) => theme.colors.bg.main};
                border-radius: 8px;
                
                input {
                    border: none;
                    height: 36px;
                    width: 110px;
                    
                    &:focus {
                        outline: none;
                    }
                }

                & > div:last-of-type {
                    width: 24px;
                    height: 24px;
                    visibility: ${({usernameInputText}) => usernameInputText !== "" ? "block" : "hidden"};
                    
                    svg {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        fill: ${({theme}) => theme.colors.font.placeholder};
                        cursor: pointer;
                        transition: all 0.2s ease-in-out 0s;

                        &:hover {
                            fill: ${({theme}) => theme.colors.font.main};
                        }
                    }
                }
                
                button {
                    width: 36px;
                    height: 36px;
                    background-color: ${({theme}) => theme.colors.bg.main};
                    padding: 5px;

                    svg {
                        fill: ${({theme}) => theme.colors.font.sub};
                        cursor: pointer;
                        transition: all 0.2s ease-in-out 0s;

                        &:hover {
                            fill: ${({theme}) => theme.colors.font.main};
                        }
                    }
                }
            }

            // 필터 관련
            & > div:last-of-type {
                cursor: pointer;
                position: relative;
                
                svg {
                    width: 32px;
                    height: 32px;
                    fill: ${({theme}) => theme.colors.font.sub};
                    transition: all 0.2s ease-in-out 0s;
                    
                    &:hover {
                        fill: ${({theme}) => theme.colors.font.main};
                    }
                }
            }
        }
    }
    
    & > div:nth-of-type(3) {
        width: 100%;
        display: flex;
        align-items: center;
        background-color: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? lighten(0.05, theme.colors.button.third) : darken(0.05, theme.colors.button.third);
        }};        
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 8px;
        position: sticky;
        //top: 72px;
        top: 134px;
        color: ${({theme}) => theme.colors.font.sub};
        z-index: 3;
        
        span {
            text-align: center;
        }
        
        & > span:first-of-type {
            width: 20%;
        }
        
        & > span:nth-of-type(2) {
            width: 15%;
        }
        
        & > span:nth-of-type(3) {
            width: 35%;
        }

        & > span:nth-of-type(4) {
            width: 15%;
        }

        & > span:nth-of-type(5) {
            width: 20%;
        }
    }
`;

export const Badge = styled.div`
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: ${({theme}) => theme.colors.font.primary};
    border-radius: 50%;
    border: 2px solid ${({theme}) => theme.colors.bg.main};
    right: -4px;
    top: -4px;
    z-index: 2;
`;