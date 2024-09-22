import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 6px;
    
    label {
        color: ${({theme}) => theme.colors.font.sub};
        margin-left: 6px;
    }
    
    input {
        color: ${({theme}) => theme.colors.font.main};
        height: 40px;
        border-radius: 8px;
        border: 1px solid ${({theme}) => theme.colors.line.main};
        padding: 8px;
        background-color: ${({theme}) => theme.colors.bg.main};
        font-size: 16px;
        font-family: Pretendard, Helvetica, sans-serif;
        cursor: pointer;

        &::placeholder {
            color: ${({theme}) => theme.colors.font.placeholder};
        }
        
        &:disabled,
        &:disabled::placeholder {
            cursor: auto;
            background-color: ${({theme}) => theme.colors.bg.sub};
            color: ${({theme}) => theme.colors.font.sub};
        }

        &:focus {
            outline: 1px solid ${({theme}) => theme.colors.line.primary};
        }
    }
    
    svg {
        fill: ${({theme}) => theme.colors.icon.fill};
        position: absolute;
        right: 12px;
        top: 30px;
        cursor: pointer;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
        display: none;
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    
    input[type='number'] {
        -moz-appearance: textfield;
    }
`;