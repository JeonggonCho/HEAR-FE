import {FC} from "react";
import {ReactSVG} from "react-svg";

import Calendar from "@components/common/Calendar";
import Select from "@components/common/Select";
import Button from "@components/common/Button";

import {IPrinterSelectContentProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";

import {Container, DateTag, SelectPrinterWrapper} from "./style.ts";

import dateIcon from "@assets/icons/date.svg";

const PrinterSelectContent:FC<IPrinterSelectContentProps> = (
    {setModal, onSelectDate, selectedDate, selectMachineMode, setSelectMachineMode, selectedMachine, setSelectedMachine, setReservation}
) => {
    const {lang} = useThemeStore();

    return (
        <Container selectMachineMode={selectMachineMode}>
            <Calendar
                calendarType={"reservation"}
                setModal={setModal}
                onSelectDate={onSelectDate}
                date={selectedDate}
                machine={"printer"}
                selectWeekend={false}
            />
            <SelectPrinterWrapper>
                {selectedDate && (
                    <DateTag>
                        <ReactSVG src={dateIcon}/><span>{cardCategories.selectedDate[lang]}</span>
                        <p>{(new Date(selectedDate)).toLocaleDateString('default', {
                            year: "numeric",
                            month: "numeric",
                            day: 'numeric'
                        })}</p>
                    </DateTag>
                )}

                <Select
                    type={"radio"}
                    onSelectChange={() => {}}
                    name={"select-printer-machine"}
                    values={[]}
                    categories={machineType}
                />

                <Button
                    type={"button"}
                    content={buttonCategories.add[lang]}
                    width={"full"}
                    color={"primary"}
                    scale={"big"}
                />
            </SelectPrinterWrapper>
        </Container>
    );
};

export default PrinterSelectContent;


export const machineType = [
    {label: "1호기", value: "1", id: "radio-1"},
    {label: "2호기", value: "2", id: "radio-2"},
    {label: "2호기", value: "2", id: "radio-2"},
    {label: "2호기", value: "2", id: "radio-2"},
];