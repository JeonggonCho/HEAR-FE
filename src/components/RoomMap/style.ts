import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    background-color: white;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

    & > p:first-child {
        margin: 0 0 18px;
        font-weight: bolder;
    }

    & > div:nth-child(2) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin-bottom: 20px;
    }
    
    & > div:nth-child(3) {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 4px;
        color: #999999;
        
        div {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            gap: 6px;
        }
        
        & > div:nth-child(2) {
            justify-content: end;
        }
    }
`;

export const CncWrapper = styled.div<{machine: "cnc" | "laser" | "printer" | "vacuum"}>`
    color: ${({machine}) => machine === "cnc" ? "#2B65FC" : "#999999"};
    background-color: ${({machine}) => machine === "cnc" ? "#F0F4FF" : "#EFEFEF"};
    border-radius: 8px;
    padding: 16px 18px;
    text-align: center;
    vertical-align: center;
`;

export const LaserWrapper = styled.div<{machine: "cnc" | "laser" | "printer" | "vacuum"}>`
    color: ${({machine}) => machine === "laser" ? "#2B65FC" : "#999999"};
    background-color: ${({machine}) => machine === "laser" ? "#F0F4FF" : "#EFEFEF"};
    border-radius: 8px;
    padding: 12px 14px;
    text-align: center;
    vertical-align: center;
    line-height: 1.2;
`;

export const PrinterWrapper = styled.div<{machine: "cnc" | "laser" | "printer" | "vacuum"}>`
    color: ${({machine}) => machine === "printer" ? "#2B65FC" : "#999999"};
    background-color: ${({machine}) => machine === "printer" ? "#F0F4FF" : "#EFEFEF"};
    border-radius: 8px;
    padding: 8px 10px;
    text-align: center;
    vertical-align: center;
    line-height: 1.2;
`;

export const VacuumWrapper = styled.div<{machine: "cnc" | "laser" | "printer" | "vacuum"}>`
    color: ${({machine}) => machine === "vacuum" ? "#2B65FC" : "#999999"};
    background-color: ${({machine}) => machine === "vacuum" ? "#F0F4FF" : "#EFEFEF"};
    border-radius: 8px;
    padding: 8px 10px;
    text-align: center;
    vertical-align: center;
    line-height: 1.2;
`;