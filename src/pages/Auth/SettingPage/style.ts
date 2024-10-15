import styled from "@emotion/styled";

export const Container = styled.div`
    a {
        padding: 20px 24px;
        
        & > div {
            & > div{
                padding: 0;
                width: 28px;
                height: 28px;
                background: none;
            }
        }
    }
    
    hr {
        border: none;
        border-bottom: 1px solid ${({theme}) => theme.colors.font.placeholder};
    }

    & > div:first-of-type {
        background-color: ${({theme}) => theme.colors.bg.main};
    }
    
    & > span:last-of-type {
        width: 100%;
        margin-top: 16px;
        text-align: center;
        display: inline-block;
        font-size: 0.85rem;
        color: ${({theme}) => theme.colors.font.placeholder};
    }
`;