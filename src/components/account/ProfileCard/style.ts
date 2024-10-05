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
    
    & > div {
        display: flex;
        align-items: center;
        gap: 12px;
        color: ${({theme}) => theme.colors.font.main};

        & > span:first-of-type {
            width: 80px;
            color: ${({theme}) => theme.colors.font.sub};
        }
    }
`;