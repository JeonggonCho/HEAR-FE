import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    border-radius: 16px;
    padding: 18px;
    background-color: ${({theme}) => theme.colors.bg.main};
    display: flex;
    flex-direction: column;
    gap: 12px;
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    margin-top: 8px;
    
    & > div {
        display: flex;
        gap: 12px;
        color: ${({theme}) => theme.colors.font.main};

        & > span:first-of-type {
            width: 80px;
            min-width: 80px;
            color: ${({theme}) => theme.colors.font.sub};
        }
        
        & > span:last-of-type {
            text-wrap: wrap;
            line-height: 1.3;
            word-break: break-all;
        }
    }
`;