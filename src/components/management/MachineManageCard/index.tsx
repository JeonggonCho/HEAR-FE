import {ChangeEvent, Dispatch, SetStateAction, useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Toggle from "@components/common/Toggle";
import MachineListItem from "@components/management/MachineListItem";
import Input from "@components/common/Input";
import Icon from "@components/common/Icon";
import TimeListContent from "@components/management/TimeListContent";
import Button from "@components/common/Button";
import Card from "@components/common/Card";
import Flex from "@components/common/Flex";
import AddMachine from "@components/management/AddMachine";
import useListCollapse from "@hooks/useListCollapse.ts";
import useToggle from "@hooks/useToggle.ts";
import useRequest from "@hooks/useRequest.ts";
import MachineSchemaProvider from "@schemata/MachineSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {
    BtnsWrapper,
    CountWrapper,
    IconWrapper,
    MachineListWrapper, MachineTitleWrapper,
    MoreWrapper,
    NoMachines
} from "./style.ts";
import {ICommonMachine, IHeats, ILasers, ILaserTimes, IPrinters} from "@/types/machine.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {machineName} from "@constants/machineCategories.ts";
import more from "@assets/icons/arrow_down.svg";
import laser_icon from "@assets/images/laser_icon.png";
import printer_icon from "@assets/images/printer_icon.png";
import heat_icon from "@assets/images/heat_icon.png";
import saw_icon from "@assets/images/saw_icon.png";
import vacuum_icon from "@assets/images/vacuum_icon.png";
import cnc_icon from "@assets/images/cnc_icon.png";


interface IMachineManageCardProps {
    machineType: "laser" | "printer" | "heat" | "saw" | "vacuum" | "cnc";
    machineData: ILasers[] | IPrinters[] | IHeats[] | ICommonMachine[];
    setMachines?: Dispatch<SetStateAction<ILasers[]>> | Dispatch<SetStateAction<IPrinters[]>>;
    timeData?: ILaserTimes[];
    setTimes?: Dispatch<SetStateAction<ILaserTimes[]>>;
}


const MachineManageCard = (
    {
        machineType,
        machineData,
        setMachines,
        timeData,
        setTimes
    }: IMachineManageCardProps
) => {
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
    const [rangeValue, setRangeValue] = useState<number | undefined>(machineType === "heat" ? (machineData[0] as IHeats)?.count : undefined);

    const {lang, isDarkMode} = useThemeStore();
    const {isOpen, listRef, maxHeight, handleList} = useListCollapse(machineData.length, timeData?.length);
    const {sendRequest} = useRequest();
    const {status, handleToggle, isLoading} = useToggle(machineData[0]?.status, machineData[0]?.url);
    const {updateHeatCountSchema} = MachineSchemaProvider();

    type UpdateHeatCountFormType = z.infer<typeof updateHeatCountSchema>;

    const {register, formState:{errors}} = useForm<UpdateHeatCountFormType>({
        resolver: zodResolver(updateHeatCountSchema),
        defaultValues: {
            count: machineType === "heat" ? (machineData[0] as IHeats)?.count : undefined,
        },
    });

    // 열선 개수 수정 요청 (디바운스를 사용하여 단일 요청만 보내기)
    const changeCountOfHeatsHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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

    return (
        <Card padding={"12px 24px"} borderRadius={0} bgColor={"main"}>
            <Flex
                align={"center"}
                justify={"space-between"}
                onClick={
                (machineType === "laser" || machineType === "printer" || machineType === "heat") ? handleList
                    : (machineType === "saw" || machineType === "vacuum" || machineType === "cnc") ? handleToggle
                        :() => {}
            }>
                {/*기기명과 아이콘*/}
                <Flex align={"center"} gap={16}>
                    <IconWrapper>
                        <img src={
                            machineType === "laser" ? laser_icon
                                : machineType === "printer" ? printer_icon
                                    : machineType === "saw" ? saw_icon
                                        : machineType === "heat" ? heat_icon
                                            : machineType === "vacuum" ? vacuum_icon
                                                : machineType === "cnc" ? cnc_icon
                                                    : undefined}
                             alt="기기 이미지"/>
                    </IconWrapper>
                    <MachineTitleWrapper>{
                        machineType === "laser" ? machineName.laser[lang]
                            : machineType === "printer" ? machineName.printer[lang]
                                : machineType === "heat" ? machineName.heat[lang]
                                    : machineType === "saw" ? machineName.saw[lang]
                                        : machineType === "vacuum" ? machineName.vacuum[lang]
                                            : machineType === "cnc" ? machineName.cnc[lang]
                                                : undefined
                    }</MachineTitleWrapper>
                </Flex>

                {/*기기 목록보기 버튼 배치*/}
                {(machineType === "laser" || machineType === "printer" || machineType === "heat") && (
                    <MoreWrapper isOpen={isOpen}>
                        <Icon svg={more} />
                    </MoreWrapper>
                )}

                {/*토글 버튼 배치*/}
                {(machineType === "saw" || machineType === "vacuum" || machineType === "cnc") &&
                  <Toggle click={() => handleToggle} status={status} isLoading={isLoading}/>
                }
            </Flex>

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
                          <Button
                            type={"button"}
                            variant={"text"}
                            width={"fit"}
                            color={"second"}
                            size={"sm"}
                            onClick={() => setShowEdit(prevState => !prevState)}
                          >
                              {buttonCategories.editing[lang]}
                          </Button>
                          <AddMachine
                            machineType={machineType}
                            setMachines={setMachines}
                          />
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
                        <CountWrapper rangeValue={rangeValue as number} darkMode={isDarkMode.toString()}>
                            <div>
                                <Input
                                    label={inputCategories.count[lang]}
                                    type={"range"}
                                    id={"heat-count"}
                                    name={"count"}
                                    register={register}
                                    onChange={changeCountOfHeatsHandler}
                                    errorMessage={errors.count?.message}
                                />
                                <span>{rangeValue}</span>
                            </div>
                            <Toggle click={handleToggle} status={status} isLoading={isLoading}/>
                        </CountWrapper>
                    }
                </>
            </MachineListWrapper>
        </Card>
    );
};

export default MachineManageCard;