import {FC, useCallback, useState} from "react";
import {ReactSVG} from "react-svg";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {v4 as uuidv4} from "uuid";

import InputWithLabel from "@components/InputWithLabel";
import Button from "@components/Button";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";
import TimeListItem from "@components/TimeListItem";

import {INewMachineContentProps} from "@/types/componentProps.ts";
import useRequest from "@hooks/useRequest.ts";
import {newLaserSchema, newPrinterSchema, timeRangeSchema} from "@schemata/machineSchema.ts";

import {Container, TimeSelectsWrapper, TimeListWrapper, ErrorMessage} from "./style.ts";

import close from "@assets/icons/close.svg";

const NewMachineContent:FC<INewMachineContentProps> = ({title, setModal, machine, setMachines}) => {
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [timeList, setTimeList] = useState<{id: string; startTime: string; endTime: string}[]>([]);

    const {sendRequest, errorText, clearError} = useRequest();

    type LaserFormData = z.infer<typeof newLaserSchema>;
    type TimeFormData = z.infer<typeof timeRangeSchema>;
    type PrinterFormData = z.infer<typeof newPrinterSchema>;

    // 레이저 커팅기 생성 useForm
    const {
        register: laserRegister,
        handleSubmit: laserHandleSubmit,
        formState:{errors: laserErrors},
    } = useForm<LaserFormData>({
        resolver: zodResolver(newLaserSchema),
        defaultValues: {
            name: "",
            times: [],
        },
    });

    // 시간 목록 생성 useForm
    const {
        register: timeRegister,
        handleSubmit: timeHandleSubmit,
        formState:{errors: timeErrors},
    } = useForm<TimeFormData>({
        resolver: zodResolver(timeRangeSchema),
        defaultValues: {
            startTime: "",
            endTime: "",
        },
    })

    // 3d 프린터 생성 useForm
    const {
        register: printerRegister,
        handleSubmit: printerHandleSubmit,
        formState:{errors: printerErrors},
    } = useForm<PrinterFormData>({
        resolver: zodResolver(newPrinterSchema),
        defaultValues: {
            name: "",
        },
    });

    // 목록에 시간 추가
    const addTime = (data: any) => {
        if (data.startTime && data.endTime) {
            const validationResult = timeRangeSchema.safeParse({ startTime, endTime });
            if (validationResult.success) {
                setTimeList(prevState => [...prevState, {id: uuidv4(), startTime, endTime }]);
                setStartTime("");
                setEndTime("");
            } else {
                console.error(validationResult.error.format());
            }
        }
    };

    // 시간 삭제
    const removeTime = (id: string) => {
        setTimeList(prevState => prevState.filter(time => time.id !== id));
    };

    // 레이저 커팅기 생성하기
    const submitLaserHandler:SubmitHandler<LaserFormData> = useCallback(async (data) => {
        try {
            data.times = timeList.map(({ startTime, endTime }) => ({ startTime, endTime })) as LaserFormData['times'];

            // 기기명과 시간 리스트의 유효성 검사
            const validationResult = newLaserSchema.safeParse(data);
            if (!validationResult.success) {
                console.error(validationResult.error.format());
                return;
            }

            const response = await sendRequest({
                url: "/machines/lasers",
                method: "post",
                data: data,
            });
            let {laser} = response.data;
            laser.url = `/machines/lasers/${laser._id}`;
            setMachines((prevState:any) => [...prevState, laser]);
        } catch (err) {
            console.error("레이저 커팅기 생성 중 에러: ", err);
        } finally {
            setModal(false);
        }
    }, [sendRequest, timeList]);

    // 3d 프린터 생성하기
    const submitPrinterHandler:SubmitHandler<PrinterFormData> = useCallback(async (data) => {
        try {
            const response = await sendRequest({
                url: "/machines/printers",
                method: "post",
                data: data,
            });
            let {printer} = response.data;
            printer.url = `/machines/printers/${printer._id}`;
            setMachines((prevState:any) => [...prevState, printer]);
        } catch (err) {
            console.error("3d 프린터 생성 중 에러: ", err);
        } finally {
            setModal(false);
        }
    }, [sendRequest]);

    return (
        <Container>
            <div>
                <h3>{title}</h3>
                <div onClick={() => {setModal(false)}}>
                    <ReactSVG src={close}/>
                </div>
            </div>

            {machine === "laser" ?
                <form onSubmit={laserHandleSubmit(submitLaserHandler)}>
                    <InputWithLabel
                        label={"기기명"}
                        type={"text"}
                        id={"laser-name"}
                        name={"name"}
                        placeholder={"기기명을 입력해주세요"}
                        register={laserRegister}
                        errorMessage={laserErrors.name?.message}
                    />

                    {/*추가된 시간 목록*/}
                    <TimeListWrapper>
                        <label>시간 목록</label>
                        <div>
                            <div>
                                {timeList.length !== 0 ?
                                    timeList.map((t) => (
                                        <TimeListItem
                                            key={t.id}
                                            startTime={t.startTime}
                                            endTime={t.endTime}
                                            onDelete={() => removeTime(t.id)}
                                        />
                                    ))
                                    :
                                    <p>시간 목록이 없습니다</p>
                                }
                            </div>

                            <TimeSelectsWrapper>
                                <div>
                                    <label htmlFor={"laser-start-time"}>
                                        시작 시간
                                    </label>
                                    <select
                                        {...timeRegister("startTime")}
                                        value={startTime}
                                        id={"laser-start-time"}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    >
                                        <option value={""}>시간 선택</option>
                                        <option value={"08:00"}>08:00</option>
                                        <option value={"09:00"}>09:00</option>
                                        <option value={"10:00"}>10:00</option>
                                        <option value={"11:00"}>11:00</option>
                                        <option value={"12:00"}>12:00</option>
                                        <option value={"13:00"}>13:00</option>
                                        <option value={"14:00"}>14:00</option>
                                        <option value={"15:00"}>15:00</option>
                                        <option value={"16:00"}>16:00</option>
                                        <option value={"17:00"}>17:00</option>
                                        <option value={"18:00"}>18:00</option>
                                        <option value={"19:00"}>19:00</option>
                                        <option value={"20:00"}>20:00</option>
                                        <option value={"21:00"}>21:00</option>
                                        <option value={"22:00"}>22:00</option>
                                        <option value={"23:00"}>23:00</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor={"laser-end-time"}>
                                        종료 시간
                                    </label>
                                    <select
                                        {...timeRegister("endTime")}
                                        value={endTime}
                                        id={"laser-end-time"}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    >
                                        <option value={""}>시간선택</option>
                                        <option value={"08:00"}>08:00</option>
                                        <option value={"09:00"}>09:00</option>
                                        <option value={"10:00"}>10:00</option>
                                        <option value={"11:00"}>11:00</option>
                                        <option value={"12:00"}>12:00</option>
                                        <option value={"13:00"}>13:00</option>
                                        <option value={"14:00"}>14:00</option>
                                        <option value={"15:00"}>15:00</option>
                                        <option value={"16:00"}>16:00</option>
                                        <option value={"17:00"}>17:00</option>
                                        <option value={"18:00"}>18:00</option>
                                        <option value={"19:00"}>19:00</option>
                                        <option value={"20:00"}>20:00</option>
                                        <option value={"21:00"}>21:00</option>
                                        <option value={"22:00"}>22:00</option>
                                        <option value={"23:00"}>23:00</option>
                                    </select>
                                </div>
                            </TimeSelectsWrapper>

                            <ErrorMessage>{timeErrors.startTime?.message}</ErrorMessage>
                            <ErrorMessage>{timeErrors.endTime?.message}</ErrorMessage>
                            <ErrorMessage>{laserErrors.times?.message}</ErrorMessage>

                            <Button
                                type={"button"}
                                content={"시간 추가"}
                                width={"full"}
                                color={"approval"}
                                scale={"small"}
                                onClick={timeHandleSubmit(addTime)}
                            />
                        </div>
                    </TimeListWrapper>

                    <Button
                        type={"submit"}
                        content={"생성하기"}
                        width={"full"}
                        color={"primary"}
                        scale={"normal"}
                    />
                </form>
                : machine === "printer" ?
                    <form onSubmit={printerHandleSubmit(submitPrinterHandler)}>
                        <InputWithLabel
                            label={"기기명"}
                            type={"text"}
                            id={"printer-name"}
                            name={"name"}
                            placeholder={"기기명을 입력해주세요"}
                            register={printerRegister}
                            errorMessage={printerErrors.name?.message}
                        />
                        <Button
                            type={"submit"}
                            content={"생성하기"}
                            width={"full"}
                            color={"primary"}
                            scale={"normal"}
                        />
                    </form>
                    : null
            }

            {errorText &&
              <Modal
                content={<ErrorContent text={errorText} closeModal={clearError}/>}
                setModal={clearError}
                type={"popup"}
              />
            }
        </Container>
    );
};

export default NewMachineContent;