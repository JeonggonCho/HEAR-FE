import styled from "@emotion/styled";

export const Container = styled.div`
    cursor: pointer;

    svg {
        fill: #B0B8C1;
        transition: all 0.2s ease-in-out 0s;
    }
    
    &:hover {
        svg {
            fill: ${({theme}) => theme.colors.font.main};
            transform: scale(1.05);
        }
    }
`;