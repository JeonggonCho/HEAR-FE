import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    span {
        font-size: 18px;
    }
    
    button {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        svg {
            margin-top: 4px;
        }
    }
    
    & + & {
        border-top: 1px solid ${({theme}) => theme.colors.line.main};
    }
`;