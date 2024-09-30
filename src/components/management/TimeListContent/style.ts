import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 36px;
    
    label {
        padding-left: 8px;
        color: ${({theme}) => theme.colors.font.sub};
        margin-bottom: 12px;
    }

    & > div:last-of-type {
        margin-top: 8px;
    }

    p {
        padding: 12px 0;
        text-align: center;
    }
    
    button {
        margin-top: 8px;
    }
`;

export const TimeSelectsWrapper = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 8px;
    border-top: 1px solid ${({theme}) => theme.colors.line.main};
    margin-bottom: 6px;
    
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 6px;
        
        select {
            width: 100%;
            padding: 8px;
            font-size: 1rem;
            border-radius: 6px;
            border: 1px solid ${({theme}) => theme.colors.line.main};
            background-color: ${({theme}) => theme.colors.bg.main};
            color: ${({theme}) => theme.colors.font.main};
            
            &:focus {
                outline: ${({theme}) => theme.colors.line.primary};
            }
        }
    }
    
    button {
        width: 120px;
    }
`;

export const ErrorMessage = styled.span`
    font-size: 0.9rem;
    display: inline-block;
    color: ${({theme}) => theme.colors.font.danger};
    margin-left: 4px;
    margin-top: 4px;
    
    & + & {
        margin-bottom: 8px;
    }
`;