import BasicBottomSheet from "@components/common/BottomSheet/BasicBottomSheet.tsx";
import {UseFormGetValues, UseFormRegister} from "react-hook-form";
import Input from "@components/common/Input";
import Calendar from "@components/common/Calendar";
import useModal from "@hooks/useModal.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";


interface IEducationManagementStartDateSettingProps {
    register: UseFormRegister<any>;
    getValues: UseFormGetValues<any>;
    selectStartDate: (date: string) => void;
}


const EducationManagementStartDateSetting = (
    {
        register,
        selectStartDate,
        getValues
    }: IEducationManagementStartDateSettingProps
) => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();

    return (
        <BasicBottomSheet
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            setShowModal={setShowModal}
            trigger={
                <Input
                    type={"text"}
                    id={"startDate"}
                    name={"startDate"}
                    placeholder={inputCategories.startDate[lang]}
                    register={register}
                    onClick={() => setShowModal(true)}
                    readonly
                />
            }
            header={inputCategories.startDate[lang]}
            body={
                <Calendar
                    calendarType={"normal"}
                    setModal={setShowModal}
                    onSelectDate={selectStartDate}
                    date={getValues("startDate")}
                    selectWeekend={true}
                />
            }
        />
    );
};

export default EducationManagementStartDateSetting;