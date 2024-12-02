import Backdrop from "@components/common/Backdrop";
import {Modal} from "@components/common/Modal/index.tsx";
import useModal from "@hooks/useModal.ts";
import RoomMap from "@components/reservation/RoomMap";


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
            <Modal.Trigger as={trigger}/>
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