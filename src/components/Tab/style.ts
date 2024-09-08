import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    height: 44px;
    background-color: ${({theme}) => theme.colors.bg.main};
    padding: 2px;
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    display: flex;
    position: sticky;
    top: 72px;
    margin-bottom: 32px;
    box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
    z-index: 3;
`;

export const TabButton = styled.div<{active: string}>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({active, theme}) => active === "true" ? theme.colors.font.primary : theme.colors.font.sub};
    font-size: 18px;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    z-index: 1;
`;

export const Background = styled.div<{ activeIndex: number; tabCount: number }>`
    position: absolute;
    top: 2px;
    left: ${({ activeIndex, tabCount }) => `calc(${activeIndex} * ((100% - 4px) / ${tabCount}) + 2px)`};
    width: ${({ tabCount }) => `calc((100% - 4px) / ${tabCount})`};
    height: 38px;
    border-radius: 8px;
    background-color: ${({theme}) => theme.colors.button.approval};
    border: 1px solid ${({theme}) => theme.colors.button.approval};
    transition: left 0.3s ease-in-out;
    z-index: 0;
`;

