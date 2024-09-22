import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    padding: 18px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    
    & > div {
        display: flex;
        align-items: center;
        gap: 10px;
        
        img {
            width: 24px;
        }
    }
    
    p {
        color: ${({theme}) => theme.colors.font.main};
        margin: 0;
        line-height: 1.5;
    }
    
    & > p:last-of-type {
        font-weight: 500;
        font-size: 18px;
        
        span {
            color: ${({theme}) => theme.colors.font.primary};
        }
    }
`;