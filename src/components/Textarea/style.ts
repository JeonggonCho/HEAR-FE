import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    margin-bottom: 32px;
    
    textarea {
        width: 100%;
        min-height: 280px;
        border-radius: 8px;
        padding: 8px;
        margin-bottom: 6px;
        border: 1px solid #E2E2E2;
        line-height: 1.5;
        resize: none;
        font-size: 16px;
        font-family: Pretendard, Helvetica, sans-serif;


        &:focus {
            outline: 1px solid #2B65FC;
        }
        
        &::-webkit-scrollbar {
            width: 20px;
        }
        
        &::-webkit-scrollbar-thumb {
            background-color: lightgrey;
            border: 7px solid white;
            border-radius: 10px;
        }
    }
    
    p {
        margin: 0;
        text-align: end;
        color: #999999;
        
        span {
            color: #2B65FC;
        }
    }
`;