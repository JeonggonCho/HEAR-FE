import styled from "@emotion/styled";

export const Container = styled.div<{ isDragging: boolean }>`
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid ${({theme, isDragging}) => (isDragging ? theme.colors.line.primary : theme.colors.bg.main)};
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: relative;
    box-shadow: ${({ isDragging }) => (isDragging ? "0 2px 8px rgba(0,0,0,0.2)" : "none")};
    background-color: ${({theme }) => theme.colors.bg.main};
    transition: background-color 0.2s ease, box-shadow 0.2s ease;

    &:focus-within {
        border: 1px solid ${({theme}) => theme.colors.line.second};
        box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
    }
    
    & > div:first-of-type {
        width: 100%;
        padding-right: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    & > div:nth-of-type(2) {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 8px;
        
        & > div:first-of-type {
            width: 100%;
        }

        @media (max-width: 600px) {
            flex-direction: column-reverse;
            align-items: start;
            gap: 24px;
        }
    }
`;

export const QuestionTypeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    label {
        margin-left: 4px;
    }
    
    select {
        padding: 8px;
        font-size: 1rem;
        border-radius: 6px;
        border: 1px solid ${({theme}) => theme.colors.line.main};
        background-color: ${({theme}) => theme.colors.bg.main};
        color: ${({theme}) => theme.colors.font.main};

        &:focus {
            outline: ${({theme}) => theme.colors.line.primary};
        }
    }
`;

export const ExplanationWrapper = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 8px;
    
    & > div:first-of-type {
        width: 100%;
    }
    
    button {
        padding: 6px 10px;
    }
`;

export const IndexWrapper = styled.label`
    width: 28px;
    height: 28px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.bg.sub};
`;

export const DragIndicator = styled.div`
    position: absolute;
    left: 50%;
    top: 8px;
    transform: translateX(-50%);
    cursor: grab;
    
    svg {
        fill: ${({theme}) => theme.colors.icon.fill};
        transition: all 0.2s ease-in-out 0s;
        
        &:hover {
            fill: ${({theme}) => theme.colors.font.main};
        }
    }
`;

export const RemoveWrapper = styled.div`
    cursor: pointer;
    
    svg {
        fill: ${({theme}) => theme.colors.icon.fill};
        transition: all 0.2s ease-in-out 0s;

        &:hover {
            fill: ${({theme}) => theme.colors.font.main};
        }
    }
`;

export const TextAnswerWrapper = styled.div`
    input {
        border-radius: 0;
        border: none;
        border-bottom: 1px solid ${({theme}) => theme.colors.line.main};
        
        &:focus {
            outline: none;
            border-bottom: 1px solid ${({theme}) => theme.colors.line.primary};
        }
    }
`;

export const OptionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 12px;
        
        button {
            padding: 2px 6px;
        }
        
        span {
            margin-left: auto;
            margin-right: 6px;
        }
    }
    
    label {
        margin-top: 6px;
        margin-left: 4px;
        margin-bottom: 8px;
    }
`;

export const OptionListItemWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    
    & > div:first-of-type {
        cursor: grab;

        svg {
            fill: ${({theme}) => theme.colors.icon.fill};
            transition: all 0.2s ease-in-out 0s;

            &:hover {
                fill: ${({theme}) => theme.colors.font.main};
            }
        }
    }
    
    & > div:nth-of-type(2) {
        width: 100%;

        input {
            width: 100%;
            border-radius: 0;
            border: none;
            border-bottom: 1px solid ${({theme}) => theme.colors.line.main};

            &:focus {
                outline: none;
                border-bottom: 1px solid ${({theme}) => theme.colors.line.primary};
            }
        }
    }
    
    input[type="radio"],
    input[type="checkbox"] {
        width: 24px;
        height: 24px;
        cursor: pointer;
        
        @media (max-width: 600px) {
            width: 32px;
            height: 32px;
        }
    }
    
    button {
        padding: 2px 6px;
    }
`;