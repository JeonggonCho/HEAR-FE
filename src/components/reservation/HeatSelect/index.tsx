import {useContext} from "react";
import BasicBottomSheet from "@components/common/BottomSheet/BasicBottomSheet.tsx";
import Input from "@components/common/Input";
import HeatSelectBottomSheetContent from "@components/reservation/HeatSelectBottomSheetContent";
import useModal from "@hooks/useModal.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {HeatReservationContext} from "@components/reservation/HeatReservationForm";


const HeatSelect = () => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {register, errors} = useContext(HeatReservationContext);

    return (
        <BasicBottomSheet
            modalRef={modalRef}
            backdropRef={backdropRef}
            setShowModal={setShowModal}
            showModal={showModal}
            trigger={
                <Input
                    label={inputCategories.date[lang]}
                    subLabel={messageCategories.noWeekendAndHoliday[lang]}
                    type={"text"}
                    id={"heat-reservation-date"}
                    name={"date"}
                    placeholder={placeholderCategories.date[lang]}
                    register={register}
                    errorMessage={errors.date?.message as string}
                    onClick={() => setShowModal(true)}
                    readonly
                />
            }
            header={headerCategories.date[lang]}
            body={<HeatSelectBottomSheetContent setModal={setShowModal}/>}
        />
    );
};

export default HeatSelect;