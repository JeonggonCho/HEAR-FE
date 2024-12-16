import {Dispatch, SetStateAction} from "react";
import Calendar from "@components/common/Calendar";
import Select from "@components/common/Select";
import Button from "@components/common/Button";
import Icon from "@components/common/Icon";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container, DateTag, SelectPrinterWrapper} from "./style.ts";
import {IPrinterReservation} from "@/types/reservation.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import dateIcon from "@assets/icons/date.svg";


interface IPrinterSelectContentProps {
    setModal: () => void;
    onSelectDate: (date: string) => void;
    selectedDate: string | undefined;
    selectMachineMode: boolean;
    setSelectMachineMode: Dispatch<SetStateAction<boolean>>;
    selectedMachine: string;
    setReservation: Dispatch<SetStateAction<IPrinterReservation | undefined>>;
    setSelectedMachine: Dispatch<SetStateAction<string>>;
}

// 더미
const machineType = [
    {label: "1호기", value: "1", id: "radio-1"},
    {label: "2호기", value: "2", id: "radio-2"},
    {label: "2호기", value: "2", id: "radio-2"},
    {label: "2호기", value: "2", id: "radio-2"},
];


const PrinterSelectContent = (
    {
        setModal,
        onSelectDate,
        selectedDate,
        selectMachineMode,
        setSelectMachineMode,
        selectedMachine,
        setSelectedMachine,
        setReservation
    }: IPrinterSelectContentProps
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
                        <Icon svg={dateIcon}/><span>{cardCategories.selectedDate[lang]}</span>
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
                    variant={"filled"}
                    width={"full"}
                    color={"primary"}
                    size={"lg"}
                >
                    {buttonCategories.add[lang]}
                </Button>
            </SelectPrinterWrapper>
        </Container>
    );
};

export default PrinterSelectContent;