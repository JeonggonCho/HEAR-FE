import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    padding: 16px 0 16px 6px;
    margin-top: 24px;
    border-top: 1px solid ${({theme}) => theme.colors.line.main};
    
    & + & {
        margin-top: 0;
    }
`;