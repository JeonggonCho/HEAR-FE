import {Dispatch, SetStateAction, useContext} from "react";
import Calendar from "@components/common/Calendar";
import {CncReservationContext} from "@components/reservation/CncReservationForm";


interface ICncSelectBottomSheetContentProps {
    setModal: Dispatch<SetStateAction<boolean>>;
}


const CncSelectBottomSheetContent = ({setModal}: ICncSelectBottomSheetContentProps) => {
    const {condition, setValue, getValues} = useContext(CncReservationContext);

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
            machine={"cnc"}
            condition={condition}
            selectWeekend={false}
        />
    );
};

export default CncSelectBottomSheetContent;