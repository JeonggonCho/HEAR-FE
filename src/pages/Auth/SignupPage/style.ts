import styled from "@emotion/styled";

export const Container = styled.div`
    form {
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin: 0 24px;
    }
`;

export const EmailFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const EmailInputWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 8px;

    div {
        width: 100%;
    }

    button {
        margin-top: 32px;
        height: 40px;
    }
`;

export const VerificationCodeInputWrapper = styled.div`
    margin-top: 12px;
    width: 100%;
    display: flex;
    gap: 8px;

    div {
        width: 100%;
    }

    button {
        height: 40px;
    }
`;