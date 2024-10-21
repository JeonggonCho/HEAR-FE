import styled from "@emotion/styled";

export const Container = styled.div<{isScrolled: boolean}>`
    width: 100%;
    
    textarea {
        width: 100%;
        min-height: ${({isScrolled}) => !isScrolled ? "auto" : "280px"};
        max-height: ${({isScrolled}) => !isScrolled ? "200px" : "none"};
        border-radius: 8px;
        padding: 8px;
        background-color: ${({theme}) => theme.colors.bg.main};
        color: ${({theme}) => theme.colors.font.main};
        border: 1px solid ${({theme}) => theme.colors.line.main};
        line-height: 1.5;
        resize: none;
        font-size: 1rem;
        font-family: Pretendard, Helvetica, sans-serif;

        &::placeholder {
            color: ${({theme}) => theme.colors.font.placeholder};
        }


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
        margin: 6px 0 0 0;
        text-align: end;
        color: ${({theme}) => theme.colors.font.sub};
        
        span {
            color: ${({theme}) => theme.colors.font.primary};
        }
    }
`;