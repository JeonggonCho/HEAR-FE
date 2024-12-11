import {Dispatch, SetStateAction} from "react";
import {Modal} from "@components/common/Modal";
import Button from "@components/common/Button";
import Backdrop from "@components/common/Backdrop";
import NewMachineContent from "@components/management/NewMachineContent";
import useModal from "@hooks/useModal.ts";
import {ILasers, IPrinters} from "@/types/machine.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


interface IAddMachineProps {
    machineType: "laser" | "printer";
    setMachines?: Dispatch<SetStateAction<ILasers[]>> | Dispatch<SetStateAction<IPrinters[]>>;
}


const AddMachine = (
    {
        machineType,
        setMachines
    }: IAddMachineProps
) => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();

    return (
        <>
            <Modal.Trigger onOpen={() => setShowModal(true)}>
                <Button
                    type={"button"}
                    variant={"text"}
                    width={"fit"}
                    color={"second"}
                    size={"sm"}
                >
                    {buttonCategories.add[lang]}
                </Button>
            </Modal.Trigger>

            {showModal &&
              <Modal.Portal>
                <Backdrop ref={backdropRef}>
                  <Modal ref={modalRef}>
                      {machineType === "laser" ?
                          <NewMachineContent
                              title={headerCategories.addLaser[lang]}
                              setModal={setShowModal}
                              machine={"laser"}
                              setMachines={setMachines as React.Dispatch<React.SetStateAction<ILasers[]>>}
                          />
                          : machineType === "printer" ?
                              <NewMachineContent
                                  title={headerCategories.addPrinter[lang]}
                                  setModal={setShowModal}
                                  machine={"printer"}
                                  setMachines={setMachines as React.Dispatch<React.SetStateAction<IPrinters[]>>}
                              />
                              : null
                      }
                  </Modal>
                </Backdrop>
              </Modal.Portal>
            }
        </>
    );
};

export default AddMachine;