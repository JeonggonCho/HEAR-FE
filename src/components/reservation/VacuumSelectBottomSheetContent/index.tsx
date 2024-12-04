import {Dispatch, SetStateAction, useContext} from "react";
import Calendar from "@components/common/Calendar";
import {VacuumReservationContext} from "@components/reservation/VacuumReservationForm";


interface IVacuumSelectBottomSheetContentProps {
    setModal: Dispatch<SetStateAction<boolean>>;
}


const VacuumSelectBottomSheetContent = ({setModal}: IVacuumSelectBottomSheetContentProps) => {
    const {condition, setValue, getValues} = useContext(VacuumReservationContext);

    const selectDateHandler = (date: string) => {
        setValue("date", date);
        setModal(false);
    };

    return (
        <Calendar
           calendarType={"reservation"}
           setModal={setModal}
           onSelectDate={selectDateHandler}
           date={getValues("date")}
           machine={"vacuum"}
           condition={condition}
           selectWeekend={false}
       />
    );
};

export default VacuumSelectBottomSheetContent;