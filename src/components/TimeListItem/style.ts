import styled from "@emotion/styled";

export const Container = styled.div<{ isDragging: boolean }>`
    width: 100%;
    padding: 12px 16px 12px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px;
    box-shadow: ${({ isDragging }) => (isDragging ? "0 2px 8px rgba(0,0,0,0.2)" : "none")};
    background-color: ${({ isDragging, theme }) => (isDragging ? theme.colors.bg.sub : theme.colors.bg.main)};
    transition: background-color 0.2s ease, box-shadow 0.2s ease;

    span {
        font-size: 18px;
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 12px;
        
        & > div:first-of-type {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        svg {
            fill: ${({theme}) => theme.colors.icon.fill};
        }
    }

    svg {
        fill: ${({theme}) => theme.colors.font.sub};
        margin-top: 4px;
        cursor: pointer;
        transition: all 0.2s ease-in-out 0s;
        
        &:hover {
            fill: ${({theme}) => theme.colors.font.main};
        }
    }
`;