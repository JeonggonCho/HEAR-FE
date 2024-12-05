import styled from "@emotion/styled";


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
            margin-top: 2px;
            display: flex;
            align-items: end;
            gap: 8px;
            
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

export const CutOffPointSettingWrapper = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 24px;
    
    & > div:first-of-type {
        display: flex;
        flex-direction: column;
        gap: 8px;
        
        & > label {
            font-size: 1.15rem;
            font-weight: 500;
            color: ${({theme}) => theme.colors.font.main};
        }
        
        & > p {
            margin: 0;
            font-size: 0.9rem;
            color: ${({theme}) => theme.colors.font.sub};
            line-height: 1.3;
            text-wrap: pretty;
            word-break: break-word;
        }
    }
    
    & > div:nth-of-type(2) {
        display: flex;
        align-items: center;
        gap: 16px;
        
        & > div:first-of-type {
            width: 48px;
        }
    }
`;