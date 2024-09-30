import styled from "@emotion/styled";

export const Container = styled.div<{isEdit: boolean, showEdit: boolean}>`
    width: 100%;
    min-height: 72px;
    padding-left: ${({isEdit, showEdit}) => isEdit && showEdit ? "1px" : "8px"};
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
`;

export const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 0;
`;

export const ControlWrapper = styled.div<{showEdit: boolean}>`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-right: ${({showEdit}) => showEdit ? "0" : "-126px"};
    opacity: ${({showEdit}) => showEdit ? '1' : '0'};
    transition: margin-right 0.2s ease-in-out 0s, opacity 0.4s ease-in-out 0s;

    button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        padding: 12px;
    }
`;