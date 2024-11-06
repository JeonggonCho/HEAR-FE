import styled from "@emotion/styled";

export const QuestionsWrapper = styled.div`
    margin: 12px 24px 0;
    
    & > button:last-of-type {
        margin-top: 20px;
    }
`;

export const MenusWrapper = styled.div`
    width: 100%;
    padding: 8px 24px 8px 30px ;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 72px;
    z-index: 2;
    background-color: ${({theme}) => theme.colors.bg.sub};
    
    & > div:first-of-type {
        width: 32px;
        height: 32px;
        overflow: hidden;
        cursor: pointer;

        svg {
            width: 100%;
            height: 100%;
            fill: ${({theme}) => theme.colors.icon.fill};
            object-fit: cover;
            transition: all 0.2s ease-in-out 0s;

            &:hover {
                fill: ${({theme}) => theme.colors.font.main};
            }
        }
    }
`;