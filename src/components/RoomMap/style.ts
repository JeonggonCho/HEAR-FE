import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    background-color: ${({theme}) => theme.colors.bg.main};
    padding: 20px;
    border-radius: 16px;
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
    text-wrap: nowrap;
    margin-bottom: 28px;
    margin-top: 10px;

    & > p:first-of-type {
        color: ${({theme}) => theme.colors.font.main};
        margin: 0 0 24px;
        font-weight: 600;
    }
`;

export const MapWrapper = styled.div`
    max-width: 340px;
    margin: auto;

    & > div:first-of-type {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin-bottom: 20px;
    }

    & > div:last-of-type {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
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

export const CncWrapper = styled.div<{machine: "cnc" | "laser" | "printer" | "vacuum"}>`
    color: ${({machine, theme}) => machine === "cnc" ? theme.colors.font.primary : theme.colors.font.sub};
    background-color: ${({machine, theme}) => machine === "cnc" ? theme.colors.button.approval : theme.colors.button.third};
    border-radius: 8px;
    padding: 16px 18px;
    text-align: center;
    vertical-align: center;
`;

export const LaserWrapper = styled.div<{machine: "cnc" | "laser" | "printer" | "vacuum"}>`
    color: ${({machine, theme}) => machine === "laser" ? theme.colors.font.primary : theme.colors.font.sub};
    background-color: ${({machine, theme}) => machine === "laser" ? theme.colors.button.approval : theme.colors.button.third};
    border-radius: 8px;
    padding: 16px 18px;
    text-align: center;
    vertical-align: center;
    line-height: 1.2;
`;

export const PrinterWrapper = styled.div<{machine: "cnc" | "laser" | "printer" | "vacuum"}>`
    color: ${({machine, theme}) => machine === "printer" ? theme.colors.font.primary : theme.colors.font.sub};
    background-color: ${({machine, theme}) => machine === "printer" ? theme.colors.button.approval : theme.colors.button.third};
    border-radius: 8px;
    padding: 10px 12px;
    text-align: center;
    vertical-align: center;
    line-height: 1.2;
`;

export const VacuumWrapper = styled.div<{machine: "cnc" | "laser" | "printer" | "vacuum"}>`
    color: ${({machine, theme}) => machine === "vacuum" ? theme.colors.font.primary : theme.colors.font.sub};
    background-color: ${({machine, theme}) => machine === "vacuum" ? theme.colors.button.approval : theme.colors.button.third};
    border-radius: 8px;
    padding: 10px 12px;
    text-align: center;
    vertical-align: center;
    line-height: 1.2;
`;