import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;

    & > div:first-of-type {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: ${({theme}) => theme.colors.bg.sub};
        position: absolute;
        right: 12px;
        top: 12px;
        cursor: pointer;

        svg {
            margin-top: 2px;
            fill: ${({theme}) => theme.colors.icon.fill};
            transition: all 0.2s ease-in-out 0s;
        }

        &:hover {
            svg {
                fill: ${({theme}) => theme.colors.font.main};
            }
        }
    }

    & > div:nth-of-type(2) {
        width: 72px;
        height: 72px;
        overflow: hidden;
        padding: 16px;
        margin: 20px auto 12px;
        border-radius: 50%;
        background-color: ${({theme}) => theme.colors.bg.sub};

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    h3 {
        margin: auto auto 20px;
        text-align: center;
        font-weight: 500;
        border: none;
    }
    
    & > div:nth-of-type(3) {
        border-radius: 8px;
        border: 1px solid ${({theme}) => theme.colors.line.main};
        overflow: hidden;
    }
`;

export const FieldWrapper = styled.div`
    display: flex;
    align-items: center;

    & > div:first-of-type {
        width: 82px;
        padding: 20px 16px 20px 10px;
        background-color: ${({theme}) => theme.colors.bg.sub};
        font-size: 16px;
        color: ${({theme}) => theme.colors.font.sub};
    }

    & > span:first-of-type {
        font-size: 16px;
        margin: 0 12px;
        word-break: break-all;
        text-wrap: wrap;
        color: ${({theme}) => theme.colors.font.main};
        line-height: 1.2;
        flex-grow: 1;
    }

    & + & {
        border-top: 1px solid ${({theme}) => theme.colors.line.main};
    }
`;

export const WarningWrapper = styled.div`
    display: flex;
    align-items: center;
    border-top: 1px solid ${({theme}) => theme.colors.line.main};
    border-bottom: 1px solid ${({theme}) => theme.colors.line.main};

    & > div:first-of-type {
        width: 82px;
        padding: 20px 16px 20px 10px;
        background-color: ${({theme}) => theme.colors.bg.sub};
        font-size: 16px;
        color: ${({theme}) => theme.colors.font.sub};
        text-wrap: nowrap;
    }
    
    & > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        gap: 12px;
        
        & > div:first-of-type {
            display: flex;
            align-items: center;
            
            & > span:first-of-type {
                font-size: 16px;
                margin-left: 12px;
                word-break: break-all;
                text-wrap: wrap;
                color: ${({theme}) => theme.colors.font.main};
                line-height: 1.2;
                flex-grow: 1;
            }
        }
        
        & > form:first-of-type {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: 12px;
            margin-right: 8px;
            
            & > input[type="text"] {
                width: 10px;
            }
        }
    }
`;

export const PassTag = styled.span<{pass: boolean}>`
    color: ${({theme, pass}) => pass ? theme.colors.font.primary : theme.colors.font.danger} !important;
`;

export const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-right: 8px;
    
    & > button {
        padding: 6px 12px;
    }
`;

