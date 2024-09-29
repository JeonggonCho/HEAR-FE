import {FC, useCallback, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReactSVG} from "react-svg";
import {z} from "zod";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import RoomMap from "@components/RoomMap";
import Button from "@components/Button";
import Input from "@components/Input";
import Modal from "@components/Modal";
import Calendar from "@components/Calendar";
import LoadingLoop from "@components/LoadingLoop";
import ErrorContent from "@components/ErrorContent";

import {sawVacuumSchema} from "@schemata/machineSchema.ts";
import useRequest from "@hooks/useRequest.ts";

import {Container, ErrorMessage, ImageWrapper, MapIcon, TimeWrapper} from "./style.ts";

import vacuum from "@assets/images/vacuum.png";
import mapIcon from "@assets/icons/map.svg";
import close from "@assets/icons/close.svg";

const ReservationVacuum:FC = () => {
    const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
    const [showMap, setShowMap] = useState<boolean>(false);
    const [showTooltip, setShowTooltip] = useState<boolean>(true);

    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    type VacuumFormData = z.infer<typeof sawVacuumSchema>;

    const {register, handleSubmit, formState: {errors}, setValue} = useForm<VacuumFormData>({
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

    const submitHandler:SubmitHandler<VacuumFormData> = useCallback(async (data) => {
        try {
            console.log(data);
        } catch (err) {
            console.error("사출성형기 예약 요청 중 에러 발생: ", err);
        }
    }, [sendRequest])

    return (
        <Container tooltip={showTooltip}>
            <Header
                leftChild={<ArrowBack/>}
                centerText={"사출 성형기 예약"}
                rightChild={
                    <MapIcon onClick={() => setShowMap(true)}>
                        <ReactSVG src={mapIcon}/>
                    </MapIcon>
                }
            />
            <ImageWrapper>
                <img src={vacuum} alt={"사출성형기"}/>
            </ImageWrapper>
            {isLoading ?
                <LoadingLoop/>
                :
                <form onSubmit={handleSubmit(submitHandler)}>
                    <Input
                        label={"날 짜"}
                        type={"date"}
                        id={"vacuum-reservation-date"}
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

            {showMap &&
              <Modal
                content={<RoomMap machine={"vacuum"} setModal={setShowMap}/>}
                setModal={setShowMap}
                type={"popup"}
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

export default ReservationVacuum;