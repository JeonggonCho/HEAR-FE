import styled from "@emotion/styled";

export const Container = styled.div<{containerWidth: string, containerHeight: string}>`
    width: ${({ containerWidth }) => containerWidth};
    height: ${({containerHeight}) => containerHeight};
    z-index: -10 !important;
`;