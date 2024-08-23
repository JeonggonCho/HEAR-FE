import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
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
        cursor: pointer;
        
        &:disabled {
            cursor: auto;
        }
        
        &::placeholder {
            color: #E2E2E2;
        }

        &:focus {
            outline: 1px solid #2B65FC;
        }
    }
    
    svg {
        fill: #999999;
        position: absolute;
        right: 12px;
        top: 30px;
        cursor: pointer;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
        display: none;
    }
`;