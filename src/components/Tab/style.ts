import styled from "@emotion/styled";
import { lighten } from "polished";

export const Container = styled.div`
    width: 100%;
    background-color: white;
    padding: 6px;
    border-radius: 16px;
    border: 1px solid white;
    display: flex;
    position: sticky;
    top: 72px;
    margin-bottom: 32px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    z-index: 3;
`;

export const TabButton = styled.div<{active: string}>`
    width: 100%;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({active}) => active === "true" ? "#2B65FC" : "#999999"};
    font-size: 18px;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    z-index: 1;
`;

export const Background = styled.div<{ activeIndex: number; tabCount: number }>`
    position: absolute;
    top: 6px;
    left: ${({ activeIndex, tabCount }) => `calc(${activeIndex} * ((100% - 12px) / ${tabCount}) + 6px)`};
    width: ${({ tabCount }) => `calc((100% - 12px) / ${tabCount})`};
    height: 38px;
    border-radius: 10px;
    background-color: ${lighten(0.38, "#2B65FC")};
    transition: left 0.3s ease-in-out;
    z-index: 0;
`;

