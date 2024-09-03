import styled from "@emotion/styled";

export const Container = styled.div`
    cursor: pointer;
    
    &:hover {
        svg {
            fill: black;
            transform: scale(1.05);
        }
    }
    
    svg {
        fill: #B0B8C1;
        transition: all 0.2s ease-in-out 0s;
    }
`;