import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    & > div:first-of-type {
        label {
            display: inline-flex;
            width: fit-content;
            color: ${({theme}) => theme.colors.font.main};
            margin-left: 4px;
            line-height: 1.5;
        }
        
        span {
            display: inline-block;
            font-size: 0.85rem;
            color: ${({theme}) => theme.colors.font.sub};
            margin-left: 4px;
            line-height: 1.5;
        }
    }
    
    input {
        color: ${({theme}) => theme.colors.font.main};
        height: 40px;
        border-radius: 8px;
        border: 1px solid ${({theme}) => theme.colors.line.main};
        padding: 8px;
        background-color: ${({theme}) => theme.colors.bg.main};
        font-size: 1rem;
        font-family: Pretendard, Helvetica, sans-serif;
        cursor: pointer;
        margin-bottom: 8px;

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

    // 자동 완성 시, autofill 제거
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
        -webkit-text-fill-color: ${({theme}) => theme.colors.font.main};
        -webkit-box-shadow: 0 0 0 1000px ${({theme}) => theme.colors.bg.main} inset;
        transition: background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s;
    }
`;

export const VisibleToggleWrapper = styled.div`
    position: absolute;
    right: 12px;
    top: 36px;
    cursor: pointer;
`;