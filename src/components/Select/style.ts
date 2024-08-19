import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    
    & > label:first-of-type {
        margin-left: 6px;
    }
    
    & > div:nth-of-type(1) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        
        div {
            width: 100%;
        }
    }
`;

export const RadioWrapper = styled.div`
    & > input {
        display: none;
    }
    
    input[type='radio']:checked + label {
        border: 1px solid #2B65FC;
        background-color: #F0F4FF;
        color: #2B65FC;
    }
`;

export const LabelWrapper = styled.label`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 56px;
    background-color: white;
    color: #999999;
    border-radius: 8px;
    border: 1px solid #E2E2E2;
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
`;