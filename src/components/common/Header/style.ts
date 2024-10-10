import styled from "@emotion/styled";

export const Container = styled.div<{type: "grid" | "flex"}>`
    width: 100%;
    max-width: 600px;
    height: 80px;
    display: ${({type}) => type === "flex" ? "flex" : "grid"};
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${({type}) => type === "flex" ? "24px" : ""};
    align-items: center;
    justify-content: ${({type}) => type === "grid" ? "" : "space-between"};
    font-weight: 500;
    font-size: 1rem;
    color: ${({theme}) => theme.colors.font.main};
    background-color: ${({theme}) => theme.colors.bg.sub};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 0 24px;
    border-left: 1px solid ${({theme}) => theme.colors.line.main};
    border-right: 1px solid ${({theme}) => theme.colors.line.main};
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