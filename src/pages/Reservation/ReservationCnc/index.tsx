import {FC, useCallback, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReactSVG} from "react-svg";
import {z} from "zod";
import {useNavigate} from "react-router-dom";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import RoomMap from "@components/content/RoomMap";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import Calendar from "@components/common/Calendar";
import LoadingLoop from "@components/common/LoadingLoop";
import ErrorContent from "@components/content/ErrorContent";

import {cncHeatSchema} from "@schemata/machineSchema.ts";
import useRequest from "@hooks/useRequest.ts";

import {CncCheckWrapper, Container, ImageWrapper, MapIcon} from "./style.ts";

import cnc from "@assets/images/cnc.png";
import mapIcon from "@assets/icons/map.svg";
import check from "@assets/icons/check.svg";

const ReservationCnc:FC = () => {
    const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
    const [showMap, setShowMap] = useState<boolean>(false);

    const navigate = useNavigate();

    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    type CncFormData = z.infer<typeof cncHeatSchema>;

    const {register, handleSubmit, formState: {errors}, setValue, getValues} = useForm<CncFormData>({
        resolver: zodResolver(cncHeatSchema),
        defaultValues: {
            check: false,
            date: "",
        }
    });

    const handleDateSelect = (date: string) => {
        setValue("date", date);
    };

    const submitHandler:SubmitHandler<CncFormData> = useCallback(async (data) => {
        try {
            const response = await sendRequest({
                url: "/reservations/cnc",
                method: "post",
                data: data,
            });
            if (response.status === 201) {
                navigate("/reservation/done", {replace: true});
            }
        } catch (err) {
            console.error("CNC 예약 요청 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    return (
        <Container>
            <Header
                leftChild={<ArrowBack/>}
                centerText={"CNC 예약"}
                rightChild={
                    <MapIcon onClick={() => setShowMap(true)}>
                        <ReactSVG src={mapIcon}/>
                    </MapIcon>
                }
            />
            <ImageWrapper>
                <img src={cnc} alt={"cnc"}/>
            </ImageWrapper>
            {isLoading ?
                <LoadingLoop/>
                :
                <form onSubmit={handleSubmit(submitHandler)}>
                    <CncCheckWrapper>
                        <div>
                            <input
                                type={"checkbox"}
                                id={"cncWarning"}
                                onClick={() => setValue("check", !getValues("check"))}
                            />
                            <label htmlFor={"cncWarning"}>
                                <div><ReactSVG src={check}/></div>
                                아래 내용을 확인하였습니다
                            </label>
                        </div>

                        <div>
                            <span>[CNC 이용 권한]</span>
                            <p>CNC 기기는 4학년 이상 학생 중 교육을 이수하고 교수님과 조교의 허락을 받은 경우에만 사용이 가능합니다</p>
                        </div>

                        {errors.check?.message &&
                          <p>{errors.check.message}</p>
                        }
                    </CncCheckWrapper>

                    <Input
                        label={"날 짜 (사용 날짜 이틀 전부터 예약 가능)"}
                        type={"date"}
                        id={"cnc-reservation-date"}
                        name={"date"}
                        placeholder={"날짜를 선택해주세요"}
                        register={register}
                        errorMessage={errors.date?.message}
                        onClick={() => setIsOpenCalendar(true)}
                        readonly
                    />

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
                content={<RoomMap machine={"cnc"} setModal={setShowMap}/>}
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

export default ReservationCnc;