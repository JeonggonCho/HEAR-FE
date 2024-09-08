import styled from "@emotion/styled";

export const Container = styled.div`
    & > p:first-of-type {
        color: ${({theme}) => theme.colors.font.main};
        line-height: 1.5;
        margin: 0 0 24px 6px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
`;