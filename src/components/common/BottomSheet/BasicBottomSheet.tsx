import React, {Dispatch, ReactNode, SetStateAction} from "react";
import {BottomSheet} from "@components/common/BottomSheet/index.tsx";
import Backdrop from "@components/common/Backdrop";

interface IBasicBottomSheetProps {
    modalRef: React.Ref<HTMLDivElement>;
    backdropRef: React.Ref<HTMLDivElement>;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    trigger: ReactNode;
    header: ReactNode | string;
    body: ReactNode | string;
}

const BasicBottomSheet = (
    {
        modalRef,
        backdropRef,
        showModal = false,
        setShowModal,
        trigger,
        header,
        body,
    }: IBasicBottomSheetProps
) => {
    return (
        <>
            <BottomSheet.Trigger>{trigger}</BottomSheet.Trigger>
            {showModal &&
              <BottomSheet.Portal>
                <Backdrop ref={backdropRef}>
                  <BottomSheet ref={modalRef}>
                    <BottomSheet.Header onClose={() => setShowModal(false)}>{header}</BottomSheet.Header>
                    <BottomSheet.Body>{body}</BottomSheet.Body>
                  </BottomSheet>
                </Backdrop>
              </BottomSheet.Portal>
            }
        </>
    );
};

export default BasicBottomSheet;