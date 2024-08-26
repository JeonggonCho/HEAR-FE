import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    height: 44px;
    background-color: #f2f2f2;
    padding: 2px;
    border-radius: 10px;
    border: 1px solid #f2f2f2;
    display: flex;
    position: sticky;
    top: 72px;
    margin-bottom: 32px;
    z-index: 3;
`;

export const TabButton = styled.div<{active: string}>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({active}) => active === "true" ? "black" : "#999999"};
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
    background-color: white;
    border: 1px solid white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    transition: left 0.3s ease-in-out;
    z-index: 0;
`;

