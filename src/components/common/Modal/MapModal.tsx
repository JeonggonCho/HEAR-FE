import Backdrop from "@components/common/Backdrop";
import RoomMap from "@components/reservation/RoomMap";
import useModal from "@hooks/useModal.ts";
import {Modal} from "@components/common/Modal/index.tsx";


interface IMapModalProps {
    trigger: JSX.Element;
    machine: "cnc" | "laser" | "printer" | "vacuum";
}


const MapModal = (
    {
        trigger,
        machine
    }: IMapModalProps
) => {
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();

    return (
        <>
            <Modal.Trigger onOpen={() => setShowModal(true)}>{trigger}</Modal.Trigger>
            {showModal &&
              <Backdrop ref={backdropRef}>
                <Modal ref={modalRef}>
                  <RoomMap
                    machine={machine}
                    setModal={setShowModal}
                  />
                </Modal>
              </Backdrop>
            }
        </>
    );
};

export default MapModal;