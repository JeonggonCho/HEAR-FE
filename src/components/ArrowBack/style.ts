import styled from "@emotion/styled";

export const Container = styled.div`
    cursor: pointer;
    width: fit-content;
    
    &:hover {
        svg {
            fill: black;
            transform: scale(1.05);
        }
    }
    
    svg {
        fill: #999999;
        transition: all 0.2s ease-in-out 0s;
    }
`;