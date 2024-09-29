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
        background-color: ${({theme}) => theme.colors.bg.main};
        color: ${({theme}) => theme.colors.font.main};
        border: 1px solid ${({theme}) => theme.colors.line.main};
        line-height: 1.5;
        resize: none;
        font-size: 1rem;
        font-family: Pretendard, Helvetica, sans-serif;


        &:focus {
            outline: 1px solid ${({theme}) => theme.colors.line.primary};
        }
        
        &::-webkit-scrollbar {
            width: 20px;
        }
        
        &::-webkit-scrollbar-thumb {
            background-color: ${({theme}) => theme.colors.font.placeholder};
            border: 7px solid ${({theme}) => theme.colors.bg.main};
            border-radius: 10px;
        }
    }
    
    & > p:last-of-type {
        margin: 0;
        text-align: end;
        color: ${({theme}) => theme.colors.font.sub};
        
        span {
            color: ${({theme}) => theme.colors.font.primary};
        }
    }
`;