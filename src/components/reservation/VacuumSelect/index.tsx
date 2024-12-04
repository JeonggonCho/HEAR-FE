import {useContext} from "react";
import Input from "@components/common/Input";
import BasicBottomSheet from "@components/common/BottomSheet/BasicBottomSheet.tsx";
import VacuumSelectBottomSheetContent from "@components/reservation/VacuumSelectBottomSheetContent";
import useModal from "@hooks/useModal.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {VacuumReservationContext} from "@components/reservation/VacuumReservationForm";
import {inputCategories} from "@constants/inputCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";


const VacuumSelect = () => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {register, errors} = useContext(VacuumReservationContext);

    return (
        <BasicBottomSheet
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            setShowModal={setShowModal}
            trigger={
                <Input
                    label={inputCategories.date[lang]}
                    subLabel={messageCategories.noWeekendAndHoliday[lang]}
                    type={"text"}
                    id={"vacuum-reservation-date"}
                    name={"date"}
                    placeholder={placeholderCategories.date[lang]}
                    register={register}
                    errorMessage={errors.date?.message as string}
                    onClick={() => setShowModal(true)}
                    readonly
                />
            }
            header={headerCategories.date[lang]}
            body={<VacuumSelectBottomSheetContent setModal={setShowModal}/>}
        />
    );
};

export default VacuumSelect;