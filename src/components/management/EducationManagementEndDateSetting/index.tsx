import {useContext} from "react";
import {UseFormGetValues, UseFormRegister} from "react-hook-form";
import BasicBottomSheet from "@components/common/BottomSheet/BasicBottomSheet.tsx";
import Input from "@components/common/Input";
import Calendar from "@components/common/Calendar";
import useModal from "@hooks/useModal.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import EducationManagementContext from "@context/EducationManagementContext.ts";
import {inputCategories} from "@constants/inputCategories.ts";


interface IEducationManagementEndDateSettingProps {
    register: UseFormRegister<any>;
    getValues: UseFormGetValues<any>;
    selectEndDate: (date: string) => void;
}


const EducationManagementEndDateSetting = (
    {
        register,
        getValues,
        selectEndDate
    }: IEducationManagementEndDateSettingProps
) => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {settings} = useContext(EducationManagementContext);

    return (
        <BasicBottomSheet
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            setShowModal={setShowModal}
            trigger={
                <Input
                    type={"text"}
                    id={"endDate"}
                    name={"endDate"}
                    placeholder={inputCategories.endDate[lang]}
                    register={register}
                    onClick={() => setShowModal(true)}
                    disabled={!settings.startDate}
                    readonly
                />
            }
            header={inputCategories.endDate[lang]}
            body={
                <Calendar
                    calendarType={"normal"}
                    setModal={setShowModal}
                    onSelectDate={selectEndDate}
                    date={getValues("endDate")}
                    selectWeekend={true}
                />
            }
        />
    );
};

export default EducationManagementEndDateSetting;