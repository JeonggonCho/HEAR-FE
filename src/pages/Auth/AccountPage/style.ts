import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    
    & > div:first-of-type {
        background-color: ${({theme}) => theme.colors.bg.main} !important;
    }
    
    & > div:nth-of-type(3) {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;

export const SettingWrapper = styled.div`
    margin-right: 4px;
    width: 28px;
    height: 28px;
    overflow: hidden;
    cursor: pointer;
    
    &:hover {
        svg {
            fill: ${({theme}) => theme.colors.font.main};
        }
    }
    
    svg {
        width: 100%;
        height: 100%;
        fill: ${({theme}) => theme.colors.icon.fill};
        transition: all 0.2s ease-in-out 0s;
    }
`;

export const LinkWrapper = styled.div`
    h3 {
        margin: 20px 0 16px 24px;
        font-size: 1.15rem;
        font-weight: 500;
        color: ${({theme}) => theme.colors.font.sub};
    }

    a {
        border-radius: 0;
        padding-right: 24px;
        padding-left: 24px;
    }
`;