import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    & > div:nth-of-type(2) {
        width: 100px;
        height: 100px;
        overflow: hidden;
        margin-bottom: 8px;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    
    & > p:first-of-type {
        text-align: center;
        margin-bottom: 64px;
        color: ${({theme}) => theme.colors.font.sub};
    }
`;