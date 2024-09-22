import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    margin-top: 4px;
    
    h3 {
        margin: 0;
        font-size: 20px;
        font-weight: 500;
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
            
            svg {
                padding-top: 2px;
            }
        }
    }
`;