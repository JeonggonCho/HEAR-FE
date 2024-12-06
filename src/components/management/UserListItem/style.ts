import styled from "@emotion/styled";

export const Container = styled.div<{pass: boolean}>`
    width: 100%;
    border-bottom: 1px solid ${({theme}) => theme.colors.line.main};
    padding: 20px 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    
    & > span:first-of-type {
        width: 25%;
        line-height: 1.3;
    }

    & > span:nth-of-type(2) {
        width: 20%;
        text-align: center;
    }

    & > span:nth-of-type(3) {
        width: 20%;
        text-align: center;
    }

    & > span:nth-of-type(4) {
        width: 20%;
        text-align: center;
        color: ${({pass, theme}) => pass ? theme.colors.font.primary : theme.colors.font.danger};
    }

    & > div:first-of-type {
        width: 15%;
    }
`;