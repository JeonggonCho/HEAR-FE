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
    
    // 기기 선택 부분
    & > div:nth-of-type(2) {
        height: 100px;
        width: calc(100% + 16px);
        padding-right: 16px;
        overflow-y: auto;
        flex-grow: 1;
        margin-bottom: 24px;

        &::-webkit-scrollbar {
            width: 6px;
            right: 100px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: ${({theme}) => theme.colors.font.placeholder};
            border-radius: 10px;
        }

        & > div {
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            label {
                height: 80px;
            }

            @media (max-width: 500px) {
                grid-template-columns: repeat(1, 1fr);

                label {
                    font-size: 1.15rem;
                }
            }
        }
    }
`;

export const DateTag = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    color: ${({theme}) => theme.colors.font.sub};
    margin-bottom: 12px;
    
    svg {
        margin-top: 2px;
        margin-right: 4px;
        fill: ${({theme}) => theme.colors.icon.fill};
    }
    
    & > p:first-of-type {
        color: ${({theme}) => theme.colors.font.main};
        margin: 0;
        margin-left: 16px;
    }
`;