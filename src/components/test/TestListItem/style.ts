import styled from "@emotion/styled";

export const Container = styled.div<{scrollbarWidth: number}>`
    min-width: 500px;
    display: flex;
    flex-direction: column;
    
    & > div:first-of-type {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 40px;

        & > div:first-of-type {
            display: flex;
            gap: 12px;
            font-size: 1.15rem;
            line-height: 1.5;

            & > span {
                font-weight: 500;
            }

            & > p {
                margin: 0;
                text-wrap: wrap;
                word-break: break-all;
            }
        }

        & > p:first-of-type {
            margin: 0 0 0 28px;
            color: ${({theme}) => theme.colors.font.sub};
            line-height: 1.5;
            text-wrap: wrap;
            word-break: break-all;
        }
    }
    
    @media (max-width: 615px) {
        min-width: ${({scrollbarWidth}) => {
            return `calc(100vw - ${100 + scrollbarWidth}px)`;
        }};
    }
`;

export const ShortAnswerWrapper = styled.div`
    display: flex;
    align-items: start;
    gap: 12px;
    flex-grow: 1;
    
    label {
        margin-top: 10px;
        text-wrap: nowrap;
        font-weight: 500;
        font-size: 1.15rem;
    }
    
    // 단답형 입력창
    & > div:first-of-type {
        width: 100%;
        
        input {
            border-radius: 0;
            border: none;
            border-bottom: 1px solid ${({theme}) => theme.colors.line.main};
            
            &:focus {
                border: none;
                outline: none;
                border-bottom: 2px solid ${({theme}) => theme.colors.line.primary};
            }
        }
    }
`;

export const ChoiceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex-grow: 1;
    
    div {
        display: flex;
        align-items: center;
        gap: 12px;
        
        input[type="checkbox"],
        input[type="radio"] {
            width: 18px;
            height: 18px;
            cursor: pointer;
        }
        
        label {
            width: 100%;
            font-size: 1.15rem;
            cursor: pointer;
            line-height: 1.2;
        }
    }
`;

export const ResetButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: 32px;
`;