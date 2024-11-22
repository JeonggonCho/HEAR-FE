import React, {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {ReactSVG} from "react-svg";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import Toggle from "@components/common/Toggle";
import Modal from "@components/common/Modal/Modal.tsx";
import MachineListItem from "@components/management/MachineListItem";
import NewMachineContent from "@components/management/NewMachineContent";
import Input from "@components/common/Input";
import TimeListContent from "@components/management/TimeListContent";

import useListCollapse from "@hooks/useListCollapse.ts";
import useToggle from "@hooks/useToggle.ts";
import useRequest from "@hooks/useRequest.ts";
import MachineSchemaProvider from "@schemata/MachineSchemaProvider.ts";
import {IMachineManageCardProps} from "@/types/componentProps.ts";
import {IHeats, ILasers, IPrinters} from "@/types/machine.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";

import {
    BtnsWrapper,
    Container,
    CountWrapper,
    IconWrapper,
    MachineListWrapper,
    MoreWrapper,
    NoMachines
} from "./style.ts";

import more from "@assets/icons/arrow_down.svg";


const MachineManageCard:FC<IMachineManageCardProps> = ({name, img, machineData, machineType, setMachines, timeData, setTimes}) => {
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [newLaserModal, setNewLaserModal] = useState<boolean>(false);
    const [newPrinterModal, setNewPrinterModal] = useState<boolean>(false);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
    const [rangeValue, setRangeValue] = useState<number | undefined>(machineType === "heat" ? (machineData[0] as IHeats)?.count : undefined);

    const {lang, isDarkMode} = useThemeStore();
    const {showToast} = useToastStore();
    const {isOpen, listRef, maxHeight, handleList} = useListCollapse(machineData.length, timeData?.length);
    const {sendRequest, errorText, clearError} = useRequest();
    const {status, handleToggle, isLoading, errorText:toggleErrorText, clearError:clearToggleError} = useToggle(machineData[0]?.status, machineData[0]?.url);
    const {updateHeatCountSchema} = MachineSchemaProvider();

    type UpdateHeatCountFormType = z.infer<typeof updateHeatCountSchema>;

    const {register, formState:{errors}} = useForm<UpdateHeatCountFormType>({
        resolver: zodResolver(updateHeatCountSchema),
        defaultValues: {
            count: machineType === "heat" ? (machineData[0] as IHeats)?.count : undefined,
        },
    });

    // 열선 개수 수정 요청 (디바운스를 사용하여 단일 요청만 보내기)
    const submitHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newCount = Number(e.target.value);
        setRangeValue(newCount);

        // 1. 기존의 타이머가 있다면 지우기
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // 2. 새로운 타이머를 설정
        const newTimeout = setTimeout(async () => {
            try {
                // 3. 타이머가 끝나면 서버에 요청을 보내기
                await sendRequest({
                    url: machineData[0]?.url,
                    method: "patch",
                    data: { "count": newCount },
                });
            } catch (err) {
                console.error("열선 개수 수정 중 에러 발생: ", err);
            }
        }, 500);

        // 4. 새로 설정한 타이머를 상태로 저장
        setDebounceTimeout(newTimeout);
    }, [debounceTimeout, sendRequest, machineData]);

    // 열선 개수 수정 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 토글 에러 메시지
    useEffect(() => {
        if (toggleErrorText) showToast(toggleErrorText, "error");
        const errorTimer = setTimeout(clearToggleError, 6000);
        return () => clearTimeout(errorTimer);
    }, [toggleErrorText]);

    return (
        <Container>
            <div onClick={
                (machineType === "laser" || machineType === "printer" || machineType === "heat") ? handleList
                    : (machineType === "saw" || machineType === "vacuum" || machineType === "cnc") ? handleToggle
                        :() => {}
            }>
                <div>
                    <IconWrapper>
                        <img src={img} alt="기기 이미지"/>
                    </IconWrapper>
                    <h3>{name}</h3>
                </div>

                {/*기기 목록보기 버튼 배치*/}
                {(machineType === "laser" || machineType === "printer" || machineType === "heat") && (
                    <MoreWrapper isOpen={isOpen}>
                        <ReactSVG src={more} />
                    </MoreWrapper>
                )}

                {/*토글 버튼 배치*/}
                {(machineType === "saw" || machineType === "vacuum" || machineType === "cnc") &&
                  <Toggle click={() => handleToggle} status={status} isLoading={isLoading}/>
                }
            </div>

            {/* 기기 목록 배치 */}
            <MachineListWrapper
                ref={listRef}
                isOpen={isOpen}
                maxHeight={isOpen ? `${maxHeight}px` : "0"}
            >
                <>
                    {(machineType === "laser" || machineType === "printer") &&
                      <BtnsWrapper>
                        <span>{machineData.length} {inputCategories.machineUnit[lang]}</span>

                        <div>
                          <button
                            onClick={() => setShowEdit(prevState => !prevState)}
                          >{buttonCategories.editing[lang]}</button>
                          <button
                            onClick={() => machineType === "laser" ? setNewLaserModal(true)
                                : machineType === "printer" ? setNewPrinterModal(true)
                                    : null}
                          >{buttonCategories.add[lang]}</button>
                        </div>
                      </BtnsWrapper>
                    }

                    {/*레이터 커팅기, 3d 프린터 목록*/}
                    {machineType === "laser" &&
                        machineData.map((laser) => (
                            <MachineListItem
                                key={laser._id}
                                showEdit={showEdit}
                                setMachines={setMachines as React.Dispatch<React.SetStateAction<ILasers[]>>}
                                {...(laser as ILasers)}
                            />
                        ))
                    }

                    {machineType === "printer" &&
                        machineData.map((printer) => (
                            <MachineListItem
                                key={printer._id}
                                showEdit={showEdit}
                                setMachines={setMachines as React.Dispatch<React.SetStateAction<IPrinters[]>>}
                                {...(printer as IPrinters)}
                            />
                        ))
                    }

                    {machineData.length === 0 &&
                        <NoMachines>{messageCategories.emptyMachine[lang]}</NoMachines>
                    }

                    {/*레이저 커팅기 시간 목록*/}
                    {machineType === "laser" &&
                      <TimeListContent
                        timeList={timeData || []}
                        setTimeList={setTimes}
                      />
                    }

                    {/*열선 개수 조절*/}
                    {machineType === "heat" &&
                        <CountWrapper rangeValue={rangeValue as number} darkmode={isDarkMode.toString()}>
                            <div>
                                <Input
                                    label={inputCategories.count[lang]}
                                    type={"range"}
                                    id={"heat-count"}
                                    name={"count"}
                                    register={register}
                                    onChange={submitHandler}
                                    errorMessage={errors.count?.message}
                                />
                                <span>{rangeValue}</span>
                            </div>
                            <Toggle click={handleToggle} status={status} isLoading={isLoading}/>
                        </CountWrapper>
                    }
                </>
            </MachineListWrapper>

            {/*레이저 커팅기 추가 모달*/}
            {newLaserModal &&
              <Modal
                content={<NewMachineContent
                    title={headerCategories.addLaser[lang]}
                    setModal={setNewLaserModal}
                    machine={"laser"}
                    setMachines={setMachines as React.Dispatch<React.SetStateAction<ILasers[]>>}
                />}
                setModal={setNewLaserModal}
                type={"popup"}
              />
            }

            {/*3d 프린터 추가 모달*/}
            {newPrinterModal &&
              <Modal
                content={<NewMachineContent
                    title={headerCategories.addPrinter[lang]}
                    setModal={setNewPrinterModal}
                    machine={"printer"}
                    setMachines={setMachines as React.Dispatch<React.SetStateAction<IPrinters[]>>}
                />}
                setModal={setNewPrinterModal}
                type={"popup"}
              />
            }
        </Container>
    );
};

export default MachineManageCard;