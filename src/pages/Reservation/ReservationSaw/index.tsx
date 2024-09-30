import {FC, useCallback, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import Modal from "@components/common/Modal";
import Calendar from "@components/common/Calendar";
import LoadingLoop from "@components/common/LoadingLoop";
import ErrorContent from "@components/content/ErrorContent";

import {sawVacuumSchema} from "@schemata/machineSchema.ts";
import useRequest from "@hooks/useRequest.ts";

import {Container, ErrorMessage, ImageWrapper, TimeWrapper} from "./style.ts";

import saw from "@assets/images/saw.png";
import close from "@assets/icons/close.svg";

const ReservationSaw:FC = () => {
    const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
    const [showTooltip, setShowTooltip] = useState<boolean>(true);

    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    type SawFormData = z.infer<typeof sawVacuumSchema>;

    const {register, handleSubmit, formState: {errors}, setValue, reset} = useForm<SawFormData>({
        resolver: zodResolver(sawVacuumSchema),
        defaultValues: {
            date: "",
            startTime: "",
            endTime: "",
        }
    });

    const handleDateSelect = (date: string) => {
        setValue("date", date);
    };

    const submitHandler:SubmitHandler<SawFormData> = useCallback(async (data) => {
        try {
            console.log(data);
        } catch (err) {
            console.log("톱 예약 요청 중 에러 발생: ", err);
            reset({});
        }
    }, [sendRequest])

    return (
        <Container tooltip={showTooltip}>
            <Header leftChild={<ArrowBack/>} centerText={"톱 예약"}/>
            <ImageWrapper>
                <img src={saw} alt={"톱"}/>
            </ImageWrapper>
            {isLoading ?
                <LoadingLoop/>
                :
                <form onSubmit={handleSubmit(submitHandler)}>
                    <Input
                        label={"날 짜"}
                        type={"date"}
                        id={"saw-reservation-date"}
                        name={"date"}
                        placeholder={"날짜를 선택해주세요"}
                        register={register}
                        errorMessage={errors.date?.message}
                        onClick={() => setIsOpenCalendar(true)}
                        readonly
                    />

                    <TimeWrapper tooltip={showTooltip}>
                        <div>
                            <label>희망 시간설정</label>
                            {showTooltip &&
                              <div>
                                <span>해당 시간은 조교의 사정에 따라 변경될 수 있습니다</span>
                                <ReactSVG src={close} onClick={() => setShowTooltip(false)}/>
                              </div>
                            }
                        </div>

                        <div>
                            <select
                                onChange={(e) => setValue("startTime", e.target.value)}
                            >
                                <option value={""}>시작 시간</option>
                                <option value={"10:00"}>10:00</option>
                                <option value={"11:00"}>11:00</option>
                                <option value={"12:00"}>12:00</option>
                                <option value={"13:00"}>13:00</option>
                                <option value={"14:00"}>14:00</option>
                                <option value={"15:00"}>15:00</option>
                                <option value={"16:00"}>16:00</option>
                                <option value={"17:00"}>17:00</option>
                            </select>
                            <select
                                onChange={(e) => setValue("endTime", e.target.value)}
                            >
                                <option value={""}>종료 시간</option>
                                <option value={"11:00"}>11:00</option>
                                <option value={"12:00"}>12:00</option>
                                <option value={"13:00"}>13:00</option>
                                <option value={"14:00"}>14:00</option>
                                <option value={"15:00"}>15:00</option>
                                <option value={"16:00"}>16:00</option>
                                <option value={"17:00"}>17:00</option>
                                <option value={"18:00"}>18:00</option>
                            </select>
                        </div>
                        {errors.startTime?.message && <ErrorMessage>{errors.startTime?.message}</ErrorMessage>}
                        {errors.endTime?.message && <ErrorMessage>{errors.endTime?.message}</ErrorMessage>}
                    </TimeWrapper>

                    <Button type={"submit"} content={"예약하기"} width={"full"} color={"primary"} scale={"big"}/>
                </form>
            }

            {isOpenCalendar &&
              <Modal
                title={"날 짜"}
                content={<Calendar setModal={setIsOpenCalendar} onSelectDate={handleDateSelect}/>}
                setModal={setIsOpenCalendar}
                type={"bottomSheet"}
              />
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

export default ReservationSaw;