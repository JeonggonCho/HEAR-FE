import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;

    p {
        color: ${({theme}) => theme.colors.font.sub};
        margin: 24px 0 0;
        text-align: center;
        text-wrap: balance;
        word-break: keep-all;
    }

    & > p:first-of-type {
        font-size: 18px;
    }
`;