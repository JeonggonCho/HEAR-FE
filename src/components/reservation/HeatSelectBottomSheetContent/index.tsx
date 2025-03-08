import {Dispatch, SetStateAction, useContext} from "react";
import Calendar from "@components/common/Calendar";
import {HeatReservationContext} from "@components/reservation/HeatReservationForm";


interface IHeatSelectBottomSheetContentProps {
    setModal: Dispatch<SetStateAction<boolean>>;
}


const HeatSelectBottomSheetContent = ({setModal}: IHeatSelectBottomSheetContentProps) => {
    const {condition, setValue, getValues} = useContext(HeatReservationContext);

    // 예약 날짜 선택
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
            machine={"heat"}
            condition={condition}
            selectWeekend={false}
        />
    );
};

export default HeatSelectBottomSheetContent;