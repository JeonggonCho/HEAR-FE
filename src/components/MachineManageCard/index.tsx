import {FC, useState} from "react";
import {ReactSVG} from "react-svg";

import Toggle from "@components/Toggle";
import Modal from "@components/Modal";
import MachineListItem from "@components/MachineListItem";

import {IMachineManageCardProps} from "@/types/componentProps.ts";
import useListCollapse from "@hooks/useListCollapse.ts";

import {Container, IconWrapper, MachineListWrapper, MoreWrapper} from "./style.ts";

import more from "@assets/icons/arrow_down.svg";
import useToggle from "@hooks/useToggle.ts";
import ErrorContent from "@components/ErrorContent";

const MachineManageCard:FC<IMachineManageCardProps> = ({name, img, machineData, machineType}) => {
    const [newLaserModal, setNewLaserModal] = useState<boolean>(false);
    const [newPrinterModal, setNewPrinterModal] = useState<boolean>(false);

    const {isOpen: isLaserOpen, listRef: laserListRef, maxHeight: laserMaxHeight, handleList: handleLaserList,} = useListCollapse();
    const {isOpen: isPrinterOpen, listRef: printerListRef, maxHeight: printerMaxHeight, handleList: handlePrinterList,} = useListCollapse();

    const {status, handleToggle, isLoading, errorText, clearError} = useToggle(machineData[0]?.status, machineData[0]?.updateUrl);

    return (
        <Container>
            <div onClick={
                machineType === "laser" ? handleLaserList
                    : machineType === "printer" ? handlePrinterList
                        : (machineType === "heat" || machineType === "saw" || machineType === "vacuum" || machineType === "cnc") ? handleToggle
                            :() => {}
            }>
                <div>
                    <IconWrapper>
                        <img src={img} alt="기기 이미지"/>
                    </IconWrapper>
                    <h3>{name}</h3>
                </div>

                {/*기기 목록보기 버튼 배치*/}
                {machineType === "laser" && (
                    <MoreWrapper isOpen={isLaserOpen}>
                        <ReactSVG src={more} />
                    </MoreWrapper>
                )}

                {machineType === "printer" && (
                    <MoreWrapper isOpen={isPrinterOpen}>
                        <ReactSVG src={more} />
                    </MoreWrapper>
                )}

                {/*토글 버튼 배치*/}
                {(machineType === "heat" || machineType === "saw" || machineType === "vacuum" || machineType === "cnc") &&
                  <Toggle
                    handleToggle={handleToggle}
                    status={status}
                    isLoading={isLoading}
                  />
                }
            </div>

            {/* 레이저 커팅기 목록 배치 */}
            <MachineListWrapper
                ref={laserListRef}
                isOpen={isLaserOpen}
                maxHeight={isLaserOpen ? `${laserMaxHeight}px` : "0"}
            >
                {machineType === "laser" &&
                    machineData.map((laser) => <MachineListItem key={laser._id} />)
                }
            </MachineListWrapper>

            {/* 3D 프린터 목록 배치 */}
            <MachineListWrapper
                ref={printerListRef}
                isOpen={isPrinterOpen}
                maxHeight={isPrinterOpen ? `${printerMaxHeight}px` : "0"}
            >
                {machineType === "printer" &&
                    machineData.map((printer) => <MachineListItem key={printer._id} />)
                }
            </MachineListWrapper>

            {/*레이저 커팅기 추가 모달*/}
            {newLaserModal &&
              <Modal
                content={<>레이저</>}
                setModal={setNewLaserModal}
                type={"popup"}
              />
            }

            {/*3d 프린터 추가 모달*/}
            {newPrinterModal &&
              <Modal
                content={<>프린터</>}
                setModal={setNewPrinterModal}
                type={"popup"}
              />
            }

            {errorText &&
                <Modal content={<ErrorContent text={errorText} closeModal={clearError}/>}
                       setModal={clearError}
                       type={"popup"}
                />
            }
        </Container>
    );
};

export default MachineManageCard;