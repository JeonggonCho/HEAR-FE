import styled from "@emotion/styled";


export const Container = styled.div<{isEdit: boolean, showEdit: boolean, lang: "ko" | "en" | "ch"}>`
    width: 100%;
    min-height: 72px;
    padding-left: ${({isEdit, showEdit}) => isEdit && showEdit ? "1px" : "8px"};
    border-top: 1px solid ${({theme}) => theme.colors.line.main};
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    
    input {
        width: ${({lang}) => lang === "en" && "172px"};
    }
    
    h3 {
        width: fit-content;
        margin: 0;
        flex-grow: 1;
    }
    
    & + & {
        margin-top: 0;
    }
`;

export const ControlWrapper = styled.div<{showEdit: boolean, lang: "ko" | "en" | "ch"}>`
    width: 100%;
    align-items: center;
    gap: 8px;
    margin-right: ${({showEdit, lang}) => {
        return showEdit ? "0" : lang === "en" ? "-138px" : lang === "ko" ? "-120px" : "-126px";
    }};
    display: ${({showEdit}) => showEdit ? 'flex' : 'hidden'};
    flex-direction: row;
    transition: margin-right 0.2s ease-in-out 0s;

    button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
    }
`;