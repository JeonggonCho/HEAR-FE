import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const EmailInputWrapper = styled.div<{sendVerificationCodeMode: boolean}>`
    width: 100%;
    display: flex;
    gap: 8px;

    @media (max-width: 500px) {
        flex-direction: ${({sendVerificationCodeMode}) => sendVerificationCodeMode && 'column'};
    }

    & > div:first-of-type {
        width: 100%;
        input:disabled {
            color: ${({theme}) => theme.colors.font.sub} !important;
        }
    }

    button {
        margin-top: 32px;
        height: 40px;
    }
`;

export const ChangeAndResendBtnsWrapper = styled.div<{sendVerificationCodeMode: boolean}>`
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 8px;
    
    @media (max-width: 500px) {
        width: 100%;
        justify-content: space-between;
        
        button {
            width: 100%;
            margin-top: 0;
        }
    }
`;

export const VerificationCodeInputWrapper = styled.div<{lang: "ko" | "en" | "ch"}>`
    margin-top: 12px;
    width: 100%;
    display: flex;
    gap: 8px;
    position: relative;
    
    & > span:first-of-type{
        position: absolute;
        top: 44px;
        right: ${({lang}) => lang === "en" ? "108px" : "80px"};
    }

    div {
        width: 100%;
    }

    button {
        margin-top: 32px;
        height: 40px;
    }
`;