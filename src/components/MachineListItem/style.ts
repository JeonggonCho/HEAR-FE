import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    padding: 16px 0 16px 8px;
    border-top: 1px solid ${({theme}) => theme.colors.line.main};
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    
    h3 {
        margin: 0;
    }
    
    & + & {
        margin-top: 0;
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 16px;
        margin: 0;
    }
`;

export const ControlWrapper = styled.div<{showEdit: boolean}>`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-right: ${({showEdit}) => showEdit ? "0" : "-126px"};
    opacity: ${({showEdit}) => showEdit ? '1' : '0'};
    transition: margin-right 0.2s ease-in-out 0s, opacity 0.4s ease-in-out 0s;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        padding: 12px;
    }
`;