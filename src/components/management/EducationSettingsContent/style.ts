import styled from "@emotion/styled";

export const Container = styled.div`
    margin: 24px 24px 64px 24px;
    display: flex;
    flex-direction: column;
    gap: 64px;
`;

export const DateSettingWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > label {
            font-size: 1.15rem;
            font-weight: 500;
            color: ${({theme}) => theme.colors.font.main};
        }
    }
`;

export const DateSelectWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: end;
    gap: 16px;
    
    div {
        width: 100%;
    }
    
    span {
        margin-bottom: 12px;
        color: ${({theme}) => theme.colors.font.sub};
    }
`;

export const StatusSettingWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    & > label {
        font-size: 1.15rem;
        font-weight: 500;
        color: ${({theme}) => theme.colors.font.main};
    }
`;