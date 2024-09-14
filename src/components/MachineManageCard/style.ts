import styled from "@emotion/styled";

export const Container = styled.div`
    width: calc(100% + 48px);
    margin-left: -24px;
    padding: 12px 24px;
    background-color: ${({theme}) => theme.colors.bg.main};
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;

    h3 {
        font-size: 16px;
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        svg {
            margin-top: 4px;
            fill: ${({theme}) => theme.colors.font.sub};
        }
        
        & > div {
            display: flex;
            align-items: center;
            gap: 16px;
        }
    }
`;

export const IconWrapper = styled.div`
    width: 48px;
    height: 48px;
    padding: 12px;
    background-color: ${({theme}) => theme.colors.bg.sub};
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
`;