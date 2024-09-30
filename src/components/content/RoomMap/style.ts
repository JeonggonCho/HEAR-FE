import styled from "@emotion/styled";

export const Container = styled.div`
    padding: 8px;
    text-wrap: nowrap;

    h3 {
        margin: 0 0 32px;
        color: ${({theme}) => theme.colors.font.main};
        font-weight: 500;
        font-size: 1rem;
    }

    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > div {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: ${({theme}) => theme.colors.bg.sub};
            position: absolute;
            right: 12px;
            top: 12px;
            cursor: pointer;

            svg {
                margin-top: 2px;
                fill: ${({theme}) => theme.colors.icon.fill};
                transition: all 0.2s ease-in-out 0s;
            }

            &:hover {
                svg {
                    fill: ${({theme}) => theme.colors.font.main};
                }
            }
        }
    }
`;

export const MapWrapper = styled.div`
    & > div:first-of-type {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin-bottom: 20px;
    }

    & > div:last-of-type {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        color: ${({theme}) => theme.colors.font.sub};
        
        div {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
        }

        & > div:nth-of-type(2) {
            justify-content: end;
            text-align: center;
            line-height: 1.2;
        }
    }
`;

export const CncWrapper = styled.span<{machine: "cnc" | "laser" | "printer" | "vacuum"}>`
    color: ${({machine, theme}) => machine === "cnc" ? theme.colors.font.primary : theme.colors.font.sub};
    background-color: ${({machine, theme}) => machine === "cnc" ? theme.colors.button.approval : theme.colors.button.third};
    border-radius: 8px;
    padding: 16px 18px;
    text-align: center;
    vertical-align: center;
    width: 100%;
`;

export const LaserWrapper = styled.span<{machine: "cnc" | "laser" | "printer" | "vacuum"}>`
    color: ${({machine, theme}) => machine === "laser" ? theme.colors.font.primary : theme.colors.font.sub};
    background-color: ${({machine, theme}) => machine === "laser" ? theme.colors.button.approval : theme.colors.button.third};
    border-radius: 8px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1.2;
    width: 100%;
    flex-grow: 1;
`;

export const PrinterWrapper = styled.span<{machine: "cnc" | "laser" | "printer" | "vacuum"}>`
    color: ${({machine, theme}) => machine === "printer" ? theme.colors.font.primary : theme.colors.font.sub};
    background-color: ${({machine, theme}) => machine === "printer" ? theme.colors.button.approval : theme.colors.button.third};
    border-radius: 8px;
    padding: 8px 0;
    text-align: center;
    vertical-align: center;
    line-height: 1.2;
    width: 100%;
    flex-grow: 1;
`;

export const VacuumWrapper = styled.span<{machine: "cnc" | "laser" | "printer" | "vacuum"}>`
    color: ${({machine, theme}) => machine === "vacuum" ? theme.colors.font.primary : theme.colors.font.sub};
    background-color: ${({machine, theme}) => machine === "vacuum" ? theme.colors.button.approval : theme.colors.button.third};
    border-radius: 8px;
    padding: 8px 0;
    text-align: center;
    vertical-align: center;
    line-height: 1.2;
    width: 100%;
    flex-grow: 1;
`;