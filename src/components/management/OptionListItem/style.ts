import styled from "@emotion/styled";

export const OptionListItemWrapper = styled.div<{ isDragging: boolean }>`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px 6px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.colors.bg.main};
    box-shadow: ${({ isDragging }) => (isDragging ? "0 2px 8px rgba(0,0,0,0.2)" : "none")};
    
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