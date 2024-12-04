import {Dispatch, SetStateAction, useContext} from "react";
import Calendar from "@components/common/Calendar";
import {SawReservationContext} from "@components/reservation/SawReservationForm";


interface ISawSelectBottomSheetContentProps {
    setModal: Dispatch<SetStateAction<boolean>>;
}


const SawSelectBottomSheetContent = ({setModal}: ISawSelectBottomSheetContentProps) => {
    const {condition, setValue, getValues} = useContext(SawReservationContext);

    // 날짜 선택
    const handleDateSelect = (date: string) => {
        setValue("date", date);
        setModal(false);
    };

    return (
        <Calendar
            calendarType={"reservation"}
            setModal={setModal}
            onSelectDate={handleDateSelect}
            date={getValues("date")}
            machine={"saw"}
            condition={condition}
            selectWeekend={false}
        />
    );
};

export default SawSelectBottomSheetContent;