import styled from "@emotion/styled";

export const Container = styled.div<{pass: boolean}>`
    width: 100%;
    background-color: ${({theme}) => theme.colors.bg.main};
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    border-radius: 8px;
    padding: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.1s ease-in-out 0s;
    
    &:hover {
        box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
    }

    span {
        text-align: center;
        line-height: 1.2;
    }
    
    & > span:first-of-type {
        width: 20%;
    }

    & > span:nth-of-type(2) {
        width: 15%;
    }

    & > span:nth-of-type(3) {
        width: 35%;
    }

    & > span:nth-of-type(4) {
        width: 15%;
    }

    & > div:first-of-type {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        
        span {
            color: ${({pass, theme}) => pass ? theme.colors.font.primary : theme.colors.font.danger};
        }
    }
    
    & + & {
        margin-top: 8px;
    }
`;