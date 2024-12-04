import {useContext} from "react";
import BasicBottomSheet from "@components/common/BottomSheet/BasicBottomSheet.tsx";
import CncSelectBottomSheetContent from "@components/reservation/CncSelectBottomSheetContent";
import Input from "@components/common/Input";
import useModal from "@hooks/useModal.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {CncReservationContext} from "@components/reservation/CncReservationForm";
import {headerCategories} from "@constants/headerCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";


const CncSelect = () => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {register, errors} = useContext(CncReservationContext);

    return (
        <BasicBottomSheet
            modalRef={modalRef}
            backdropRef={backdropRef}
            setShowModal={setShowModal}
            showModal={showModal}
            trigger={
                <Input
                    label={inputCategories.twoDayLaterDate[lang]}
                    subLabel={messageCategories.noWeekendAndHoliday[lang]}
                    type={"text"}
                    id={"cnc-reservation-date"}
                    name={"date"}
                    placeholder={placeholderCategories.date[lang]}
                    register={register}
                    errorMessage={errors.date?.message as string}
                    onClick={() => setShowModal(true)}
                    readonly
                />
            }
            header={headerCategories.date[lang]}
            body={<CncSelectBottomSheetContent setModal={setShowModal}/>}
        />
    );
};

export default CncSelect;