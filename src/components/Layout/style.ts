import styled from "@emotion/styled";

export const OutletWrapper = styled.section`
    padding: 0 24px 32px;
    height: calc(100vh - 80px);
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 20px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: lightgrey;
        border-radius: 10px;
        border: 7px solid #F8F8F8;
        cursor: pointer;
    }

    &::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0);
    }

    &::-webkit-scrollbar-button:vertical:start:decrement,
    &::-webkit-scrollbar-button:vertical:start:increment {
        display: block;
        height: 40px;
    }
`;