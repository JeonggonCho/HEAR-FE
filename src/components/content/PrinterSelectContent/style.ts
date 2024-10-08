import styled from "@emotion/styled";

export const Container = styled.div<{selectMachineMode: boolean}>`
    width: 200%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-left: ${({ selectMachineMode }) => selectMachineMode ? "-100%" : "0px"};
    transition: all 0.2s ease-in-out 0s;
`;

export const SelectPrinterWrapper = styled.div`
    width: 100%;
    padding: 12px 24px;
    display: flex;
    flex-direction: column;
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
        
        & > h3 {
            margin: 0;
            padding: 0;
            width: fit-content;
            border: none;
            font-size: 1.15rem;
            font-weight: 500;
        }
    }
`;