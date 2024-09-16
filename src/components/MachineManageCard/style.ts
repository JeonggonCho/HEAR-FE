import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";
import {lighten} from "polished";

export const Container = styled.div`
    width: calc(100% + 48px);
    margin-left: -24px;
    padding: 12px 24px;
    background-color: ${({theme}) => theme.colors.bg.main};
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;

    h3 {
        font-size: 16px;
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        
        svg {
            margin-top: 4px;
            fill: ${({theme}) => theme.colors.font.sub};
        }
        
        & > div {
            display: flex;
            align-items: center;
            gap: 16px;
        }
    }
`;

export const IconWrapper = styled.div`
    width: 48px;
    height: 48px;
    padding: 12px;
    background-color: ${({theme}) => theme.colors.bg.sub};
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
`;

export const MoreWrapper = styled.div<{isOpen: boolean}>`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(${({isOpen}) => isOpen ? "180deg" : "0deg"});
    transition: transform 0.3s ease-in-out 0s;
    overflow: hidden;
    
    svg {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const MachineListWrapper = styled.div<{ isOpen: boolean; maxHeight: string }>`
    max-height: ${(props) => (props.isOpen ? props.maxHeight : "0")};
    transition: max-height 0.3s ease-in-out;
    overflow: hidden;
`;

export const BtnsWrapper = styled.div`
    padding: 24px 0 12px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    span {
        color: ${({theme}) => theme.colors.font.sub};
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 12px;
        
        button {
            background: none;
            border: none;
            color: ${({theme}) => theme.colors.font.sub};
            transition: all 0.2s ease-in-out 0s;
            font-size: 16px;
            cursor: pointer;
            
            &:hover {
                color: ${({theme}) => theme.colors.font.main};
            }
        }
    }
`;

export const CountWrapper = styled.div<{rangeValue: number}>`
    width: 100%;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    & > div:first-of-type {
        width: 70%;
        display: flex;
        align-items: center;
        gap: 12px;
        
        & > div:first-of-type {
            width: 100%;
            gap: 16px;
            
            input[type=range] {
                position: relative;
                width: 100%;
                height: 1px;
                padding: 0;
                background: transparent;                
                border-radius: 8px;
                border: none;
                outline: none;
                transition: background 450ms ease-in;
                -webkit-appearance: none;

                &:after {
                    position: absolute;
                    top: -3px;
                    left: 0;
                    content: "";
                    width: calc((100% - 16px) * (${({rangeValue}) => rangeValue} / 15));
                    height: 6px;
                    border-radius: 3px;
                    background-color: ${({theme}) => {
                        const {isDarkMode} = useThemeStore();
                        return isDarkMode ? theme.colors.button.primary : lighten(0.1, theme.colors.button.primary); 
                    }};
                    z-index: 0;
                }
            }

            input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                position: relative;
                background: white;
                cursor: pointer;
                border: 1px solid ${({theme}) => theme.colors.line.main};
                height: 24px; 
                width: 24px;
                margin-top: -9px;
                border-radius: 50%;
                z-index: 3;
            }
            
            input[type=range]::-webkit-slider-runnable-track {
                width: 100%; 
                height: 6px;
                cursor: pointer;
                background: ${({theme}) => theme.colors.font.placeholder};
                border-radius: 3px;
            }
        }

        & > span {
            width: 48px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 32px;
            font-size: 18px;
            color: ${({theme}) => theme.colors.font.sub};
            border-radius: 8px;
            background-color: ${({theme}) => theme.colors.bg.sub};
        }
    }
    
    & > button:last-of-type {
        margin-top: 32px;
    }
`;