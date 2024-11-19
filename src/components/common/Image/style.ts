import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({theme}) => theme.colors.line.main};
    cursor: zoom-in;
    
    & + & {
        margin-top: 0;
    }
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;