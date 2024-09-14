import {FC, useState} from "react";
import {ReactSVG} from "react-svg";

import Toggle from "@components/Toggle";
import ColoredBtn from "@components/ColoredBtn";

import {IMachineManageCardProps} from "@/types/componentProps.ts";

import {Container, IconWrapper} from "./style.ts";

import add from "@assets/icons/add.svg";
import Modal from "@components/Modal";
import MachineListItem from "@components/MachineListItem";

const MachineManageCard:FC<IMachineManageCardProps> = ({name, img, machineData, machineType}) => {
    const [newLaserModal, setNewLaserModal] = useState<boolean>(false);
    const [newPrinterModal, setNewPrinterModal] = useState<boolean>(false);

    return (
        <Container>
            <div>
                <div>
                    <IconWrapper>
                        <img src={img} alt="기기 이미지"/>
                    </IconWrapper>
                    <h3>{name}</h3>
                </div>

                {/*토글 버튼 배치*/}
                {(machineType === "heat" || machineType === "saw" || machineType === "vacuum" || machineType === "cnc") &&
                  <Toggle
                    status={machineData[0]?.status}
                    url={machineData[0]?.updateUrl}
                  />
                }

                {/*기기 추가 버튼 배치*/}
                {(machineType === "laser" || machineType === "printer") &&
                    <ColoredBtn
                      type={"button"}
                      content={<ReactSVG src={add}/>}
                      width={"fit"}
                      color={"third"}
                      scale={"small"}
                      onClick={() => {
                          machineType === "laser" ? setNewLaserModal(true)
                              : machineType === "printer" ? setNewPrinterModal(true)
                                  : null
                      }}
                    />
                }
            </div>

            {/*레이저 커팅기 목록 배치*/}
            {machineType === "laser" &&
                <>
                    {machineData.map((laser) => (
                        <MachineListItem key={laser._id}/>
                    ))}
                </>
            }

            {/*3d 프린터 목록 배치*/}
            {machineType === "printer" &&
                <>
                    {machineData.map((printer) => (
                        <MachineListItem key={printer._id}/>
                    ))}
                </>
            }

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
        </Container>
    );
};

export default MachineManageCard;