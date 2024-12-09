import {Dispatch, SetStateAction} from "react";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import useModal from "@hooks/useModal.ts";
import {IReservation} from "@/types/componentProps.ts";
import {ReservationArgumentsType} from "@pages/reservation/MyReservationsPage";
import {useThemeStore} from "@store/useThemeStore.ts";
import {DeleteSelectedReservationsBtnWrapper} from "@components/reservation/DeleteSelectedReservations/style.ts";
import {confirmModalHeader} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


interface IDeleteSelectedReservationsProps {
    selectedReservations: IReservation[];
    setSelectedReservations: Dispatch<SetStateAction<IReservation[]>>;
    deleteReservations: (target: ReservationArgumentsType[]) => Promise<void>;
}


const DeleteSelectedReservations = (
    {
        selectedReservations,
        setSelectedReservations,
        deleteReservations}: IDeleteSelectedReservationsProps
) => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, setShowModal, showModal} = useModal();

    // 선택된 내역 예약 취소
    const deleteSelectedReservations = async () => {
        if (selectedReservations.length === 0) return;
        await deleteReservations(selectedReservations);
        setSelectedReservations([]);
        setShowModal(false);
    };

    return (
        <ConfirmModal
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            setShowModal={setShowModal}
            trigger={
                <DeleteSelectedReservationsBtnWrapper>
                    <span>{buttonCategories.deleteSelectedReservations[lang]}</span>
                    {selectedReservations.length > 0 && <span>{`(${selectedReservations.length})`}</span>}
                </DeleteSelectedReservationsBtnWrapper>
            }
            header={<h4 css={confirmModalHeader}>{messageCategories.confirmDeleteSelectedReservation[lang]}</h4>}
            leftBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    color={"third"}
                    size={"md"}
                    width={"full"}
                    onClick={() => setShowModal(false)}
                >
                    {buttonCategories.close[lang]}
                </Button>
            }
            rightBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    color={"danger"}
                    size={"md"}
                    width={"full"}
                    onClick={() => deleteSelectedReservations()}
                >
                    {buttonCategories.delete[lang]}
                </Button>
            }
        />
    );
};

export default DeleteSelectedReservations;