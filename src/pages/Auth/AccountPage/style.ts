import styled from "@emotion/styled";

export const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-grow: 1;

    & > div:first-of-type {
        min-width: 44px;
        width: 44px;
        height: 44px;
        overflow: hidden;
        border-radius: 50%;
        border: 1px solid ${({theme}) => theme.colors.line.main};
        background-color: ${({theme}) => theme.colors.bg.main};

        svg {
            width: 100%;
            height: 100%;
            object-fit: cover;
            fill: ${({theme}) => theme.colors.icon.fill};
        }
    }
    
    & > div:last-of-type {
        display: flex;
        flex-direction: column;
        gap: 8px;
        
        & > p {
            width: fit-content;
            margin: 0;
            font-size: 1.15rem;
        }
        
        & > span {
            text-wrap: wrap;
            word-break: break-all;
            font-size: 0.87rem;
            color: ${({theme}) => theme.colors.font.sub};
        }
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    & > div:nth-of-type(3) {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;

export const UpdateButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    
    & > a {
        text-wrap: nowrap;
        padding-left: 0;
        padding-right: 0;
    }
`;