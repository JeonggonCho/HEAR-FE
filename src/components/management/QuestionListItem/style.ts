import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    padding: 14px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 12px;
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    
    &:focus-within {
        border: 1px solid ${({theme}) => theme.colors.line.second};
        box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
    }

    & + & {
        margin-top: 20px;
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
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        
        & > div:first-of-type {
            width: 100%;
        }
        
        @media (max-width: 600px) {
            flex-direction: column-reverse;
            align-items: start;
        }
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