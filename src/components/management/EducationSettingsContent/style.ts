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
        
        & > div:first-of-type {
            display: flex;
            align-items: center;
            gap: 8px;

            & > button {
                padding: 4px 8px;
            }
        }
    }
`;

export const DateSelectWrapper = styled.form`
    width: 100%;
    display: flex;
    align-items: start;
    gap: 16px;
    
    & > div:first-of-type {
        display: flex;
        flex-direction: column;
        gap: 12px;
        
        & > div:first-of-type {
            display: flex;
            align-items: end;
            gap: 16px;
            
            input {
                width: 100%;
            }
        }
        
        & > div:nth-of-type(2) {
            display: flex;
            flex-direction: column;
            gap: 8px;
            
            p {
                color: ${({theme}) => theme.colors.font.danger};
            } 
        }
    }
    
    & > button {
        margin-top: 28px;
    }
    
    @media (max-width: 480px) {
        flex-direction: column;
        
        & > button {
            margin-top: 0;
            width: 100%;
        }
    }
    
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