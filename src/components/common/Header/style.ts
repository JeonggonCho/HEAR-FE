import styled from "@emotion/styled";

export const Container = styled.div<{type: "grid" | "flex", bgColor: boolean}>`
    width: 100%;
    height: 72px;
    padding: 0 24px;
    display: ${({type}) => type === "flex" ? "flex" : "grid"};
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${({type}) => type === "flex" ? "24px" : ""};
    align-items: center;
    justify-content: ${({type}) => type === "grid" ? "" : "space-between"};
    font-weight: 500;
    font-size: 1rem;
    color: ${({theme}) => theme.colors.font.main};
    position: sticky;
    top: 0;
    background-color: ${({theme, bgColor}) => bgColor ? theme.colors.bg.main : theme.colors.bg.sub};
    transition: all 0.2s ease-in-out 0s;
    z-index: 3;
    
    & > div:first-of-type{
        flex-grow: ${({type}) => type === "flex" ? 1 : 0};
    }
`;

export const LeftChildWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    text-align: start;
`;

export const CenterTextWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    text-wrap: nowrap;
`;

export const RightChildWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: end;
`;