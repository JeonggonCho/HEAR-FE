import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    
    label {
        margin-left: 6px;
    }
    
    input {
        height: 40px;
        border-radius: 8px;
        border: 1px solid #E2E2E2;
        padding: 8px;
        font-size: 16px;
        font-family: Pretendard, Helvetica, sans-serif;
        
        &::placeholder {
            color: #E2E2E2;
        }

        &:focus {
            outline: 1px solid #2B65FC;
        }
    }
`;