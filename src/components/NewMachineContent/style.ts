import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    margin-top: 4px;
    
    h3 {
        margin: 0;
        font-size: 20px;
    }
    
    form {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        padding: 0 0 0 4px;
        
        & > div {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: ${({theme}) => theme.colors.button.second};
            cursor: pointer;
        }
    }
`;

export const TimeListWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    label {
        margin-left: 6px;
        color: ${({theme}) => theme.colors.font.sub};
    }
    
    & > div:first-of-type {
        width: 100%;
        border-radius: 8px;
        background-color: ${({theme}) => theme.colors.bg.sub};
        padding: 8px;

        & > div:first-of-type {
            max-height: 200px;
            overflow: auto;
            
            & > p:first-of-type {
                text-align: center;
                color: ${({theme}) => theme.colors.font.sub};
            }
        }
    }
`;

export const TimeSelectsWrapper = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 8px;
    margin-top: 32px;
    margin-bottom: 8px;
    
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 6px;
        
        select {
            width: 100%;
            height: 32px;
            font-size: 18px;
            border-radius: 6px;
            padding: 4px;
        }
    }
`;

export const ErrorMessage = styled.p`
    font-size: 14px;
    color: ${({theme}) => theme.colors.font.danger};
    margin-left: 4px;
`;