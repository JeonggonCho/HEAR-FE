import {ReactSVG} from "react-svg";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import useModal from "@hooks/useModal.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {IReservation} from "@/types/componentProps.ts";
import {DeleteBtnWrapper} from "@components/reservation/DeleteReservation/style.ts";
import {confirmModalHeader} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import close from "@assets/icons/close.svg";


interface IDeleteReservationProps {
    reservation: IReservation;
    deleteHandler: (reservations: {machine: "laser" | "printer" | "heat" | "saw" | "vacuum" | "cnc", _id: string, date: string}[]) => void;
}


const DeleteReservation = ({reservation, deleteHandler}: IDeleteReservationProps) => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();

    return (
        <ConfirmModal
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            setShowModal={setShowModal}
            trigger={
                <DeleteBtnWrapper>
                    <ReactSVG src={close}/>
                </DeleteBtnWrapper>
            }
            header={<h4 css={confirmModalHeader}>{messageCategories.deleteReservation[lang]}</h4>}
            leftBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"full"}
                    size={"md"}
                    color={"third"}
                    onClick={() => setShowModal(false)}
                >
                    {buttonCategories.close[lang]}
                </Button>
            }
            rightBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"full"}
                    size={"md"}
                    color={"danger"}
                    onClick={() => deleteHandler([{machine: reservation.machine, _id: reservation._id, date: reservation.date}])}
                >
                    {buttonCategories.delete[lang]}
                </Button>
            }
        />
    );
};

export default DeleteReservation;