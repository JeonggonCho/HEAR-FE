import {FC} from "react";

import Calendar from "@components/common/Calendar";
import ArrowBack from "@components/common/ArrowBack";

import {IPrinterSelectContentProps} from "@/types/componentProps.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, SelectPrinterWrapper} from "./style.ts";
import Select from "@components/common/Select";

const PrinterSelectContent:FC<IPrinterSelectContentProps> = (
    {setModal, onSelectDate, selectedDate, selectMachineMode, setSelectMachineMode, selectedMachine, setSelectedMachine, setReservation}
) => {
    const {lang} = useThemeStore();

    return (
        <Container selectMachineMode={selectMachineMode}>
            <Calendar
                setModal={setModal}
                onSelectDate={onSelectDate}
                date={selectedDate}
                machine={"printer"}
            />
            <SelectPrinterWrapper>
                <div>
                    <ArrowBack action={() => setSelectMachineMode(false)}/> <h3>{inputCategories.selectMachine[lang]}</h3>
                </div>
                <Select
                    type={"radio"}
                    onSelectChange={() => {}}
                    name={"select-printer-machine"}
                    values={[]}
                    categories={machineType}
                />
            </SelectPrinterWrapper>
        </Container>
    );
};

export default PrinterSelectContent;


export const machineType = [
    {label: "1호기", value: "1", id: "radio-1"},
    {label: "2호기", value: "2", id: "radio-2"},
];