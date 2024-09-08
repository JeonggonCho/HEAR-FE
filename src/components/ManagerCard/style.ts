import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 16px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    transition: all 0.2s ease-in-out 0s;

    h3 {
        margin: 0;
        color: ${({theme}) => theme.colors.font.main};
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 10px;
        
        img {
            width: 28px;
        }
    }
    
    & > div:last-of-type {
        display: flex;
        justify-content: space-between;
        
        div {
            display: flex;
            align-items: end;
            gap: 8px;

            span {
                margin-bottom: 4px;
                color: ${({theme}) => theme.colors.font.main};
            }
            
            & > span:last-of-type {
                font-size: 14px;
                color: ${({theme}) => theme.colors.font.sub};
                margin-bottom: 5px;
            }
        }
    }
`;