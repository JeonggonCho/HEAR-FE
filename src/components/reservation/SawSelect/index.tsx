import {useContext} from "react";
import BasicBottomSheet from "@components/common/BottomSheet/BasicBottomSheet.tsx";
import Input from "@components/common/Input";
import SawSelectBottomSheetContent from "@components/reservation/SawSelectBottomSheetContent";
import useModal from "@hooks/useModal.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {SawReservationContext} from "@components/reservation/SawReservationForm";
import {inputCategories} from "@constants/inputCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";


const SawSelect = () => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, setShowModal, showModal} = useModal();
    const {register, errors} = useContext(SawReservationContext);

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
                    id={"saw-reservation-date"}
                    name={"date"}
                    placeholder={placeholderCategories.date[lang]}
                    register={register}
                    errorMessage={errors.date?.message as string}
                    onClick={() => setShowModal(true)}
                    readonly
                />
            }
            header={headerCategories.date[lang]}
            body={<SawSelectBottomSheetContent setModal={setShowModal}/>}
        />
    );
};

export default SawSelect;