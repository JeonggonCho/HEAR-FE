import {Dispatch, SetStateAction} from "react";
import BasicBottomSheet from "@components/common/BottomSheet/BasicBottomSheet.tsx";
import LaserSelectBottomSheetContent from "@components/reservation/LaserSelectBottomSheetContent";
import Button from "@components/common/Button";
import useModal from "@hooks/useModal.ts";
import {ILaserInfo, ILaserReservation, ILaserTimesinfo} from "@/types/reservation.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


interface ILaserSelectProps {
    laserInfo: ILaserInfo[];
    laserTimesInfo: ILaserTimesinfo[];
    reservationList: ILaserReservation[];
    setReservationList: Dispatch<SetStateAction<ILaserReservation[]>>;
}


const LaserSelect = (
    {
        laserInfo,
        laserTimesInfo,
        reservationList,
        setReservationList,
    }: ILaserSelectProps
) => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();

    return (
        <>
            <BasicBottomSheet
                modalRef={modalRef}
                backdropRef={backdropRef}
                setShowModal={setShowModal}
                showModal={showModal}
                trigger={
                    <Button
                        type={"button"}
                        variant={"filled"}
                        width={"full"}
                        color={"approval"}
                        size={"md"}
                        onClick={() => setShowModal(true)}
                    >
                        {buttonCategories.selectMachineAndTime[lang]}
                    </Button>
                }
                header={buttonCategories.selectMachineAndTime[lang]}
                body={
                    <LaserSelectBottomSheetContent
                        laserInfo={laserInfo}
                        laserTimesInfo={laserTimesInfo}
                        reservationList={reservationList}
                        setReservationList={setReservationList}
                        setModal={setShowModal}
                    />
                }
            />
        </>
    );
};

export default LaserSelect;
