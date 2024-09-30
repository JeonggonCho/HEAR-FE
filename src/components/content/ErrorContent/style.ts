import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    svg {
        width: 56px;
        margin-top: 18px;
        fill: ${({theme}) => theme.colors.icon.fill};
    }

    & > p:first-of-type {
        text-align: center;
        word-break: keep-all;
        text-wrap: balance;
        font-size: 1.15rem;
        font-weight: 500;
        margin: 20px 0 32px;
        line-height: 1.5;
        
    }
`;