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
    
    & > div:first-of-type {
        width: 100%;
        display: flex;
        gap: 12px;
        
        div {
            width: 100%;
        }
        
        button {
            margin-top: 32px;
            height: 40px;
        }
    }
`;