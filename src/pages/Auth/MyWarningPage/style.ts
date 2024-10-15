import styled from "@emotion/styled";

export const WarningsListItemWrapper = styled.div`
    margin: 8px 24px;
`;

export const WarningsListItem = styled.div`
    background-color: ${({theme}) => theme.colors.bg.main};
    padding: 16px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;

    p {
        margin: 0 0 8px;
    }

    span {
        color: ${({theme}) => theme.colors.font.sub};
        letter-spacing: -0.5px;
        font-size: 0.9rem;
    }

    & > div:first-of-type {
        width: 28px;
        height: 28px;
        overflow: hidden;
        
        svg {
            fill: ${({theme}) => theme.colors.font.danger};
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    
    & + & {
        margin-top: 12px;
    }
`;