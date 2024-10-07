import styled from "@emotion/styled";

export const Container = styled.div`
    & > p:first-of-type {
        width: 80%;
        color: ${({theme}) => theme.colors.font.main};
        line-height: 1.5;
        margin: 0 0 24px 6px;
        text-wrap: wrap;
        word-break: keep-all;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
`;