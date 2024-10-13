import styled from "@emotion/styled";

export const Container = styled.main`
    width: 100%;
    max-width: 600px;
    height: 100%;
    margin: auto;
`;

export const OutletWrapper = styled.section<{background: boolean}>`
    width: 100%;
    min-height: 100vh;
    padding-bottom: 120px;
    box-shadow: 0 0 15px ${({theme}) => theme.colors.bg.shadow};
    transition: all 0.2s ease-in-out 0s;
    background-color: ${({theme, background}) => background ? theme.colors.bg.sub : theme.colors.bg.main};
    border-left: 1px solid ${({theme}) => theme.colors.line.main};
    border-right: 1px solid ${({theme}) => theme.colors.line.main};
`;