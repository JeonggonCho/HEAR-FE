import styled from "@emotion/styled";

export const ArrowBackWrapper = styled.div`
    width: fit-content;
    cursor: pointer;
    
    &:hover {
        svg {
            fill: ${({theme}) => theme.colors.font.main};
            transform: scale(1.05);
        }
    }
    
    svg {
        fill: #B0B8C1;
        transition: all 0.2s ease-in-out 0s;
    }
`;