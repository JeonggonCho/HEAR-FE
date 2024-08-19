import styled from "@emotion/styled";

export const Container = styled.div`
    & > p:first-of-type {
        line-height: 1.5;
        margin-bottom: 28px;
        margin-left: 8px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
`;