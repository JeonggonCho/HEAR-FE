import React, {ElementType, ReactNode} from "react";
import {Modal} from "@components/common/Modal/index.tsx";
import Backdrop from "@components/common/Backdrop";
import Flex from "@components/common/Flex";

interface IConfirmModalProps {
    modalRef: React.Ref<HTMLDivElement>;
    backdropRef: React.Ref<HTMLDivElement>;
    showModal: boolean;
    header: ReactNode;
    subMessage?: string | ReactNode;
    children?: ReactNode;
    trigger: ReactNode;
    triggerAs?: ElementType;
    leftBtn?: ReactNode;
    rightBtn: ReactNode;
}

const ConfirmModal = (
    ({
         modalRef,
         backdropRef,
         showModal = false,
         header,
         subMessage = "",
         children = null,
         trigger,
         triggerAs,
         leftBtn,
         rightBtn,
    }: IConfirmModalProps) => {
        return (
            <>
                <Modal.Trigger as={triggerAs}>{trigger}</Modal.Trigger>
                {showModal &&
                  <Modal.Portal>
                    <Backdrop ref={backdropRef}>
                      <Modal ref={modalRef}>
                        <Modal.Header>{header}</Modal.Header>
                          {subMessage}
                        <Modal.Body>{children}</Modal.Body>
                        <Modal.Footer>
                          <Flex align={"center"} justify={"space-between"} gap={12}>
                              {leftBtn}
                              {rightBtn}
                          </Flex>
                        </Modal.Footer>
                      </Modal>
                    </Backdrop>
                  </Modal.Portal>
                }
            </>
        );
    }
);

export default ConfirmModal;