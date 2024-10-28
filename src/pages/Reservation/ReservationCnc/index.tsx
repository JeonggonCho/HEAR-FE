import {FC, useCallback, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {ReactSVG} from "react-svg";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import RoomMap from "@components/content/RoomMap";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import Calendar from "@components/common/Calendar";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import MachineSchemaProvider from "@schemata/MachineSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";

import {CncCheckWrapper, Container, ImageWrapper, MapIcon} from "./style.ts";

import cnc from "@assets/images/cnc.png";
import mapIcon from "@assets/icons/map.svg";
import check from "@assets/icons/check.svg";


const ReservationCnc:FC = () => {
    const [condition, setCondition] = useState([]);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [showMap, setShowMap] = useState<boolean>(false);

    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();
    const {cncHeatSchema} = MachineSchemaProvider();

    // 현재 CNC 예약 현황 조회
    const fetchAllCncReservationInfo = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/reservations/cncs",
            });
            if (response.data) {
                setCondition(response.data);
            }
        } catch (err) {
            console.error("cnc 예약 현황 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, setCondition]);

    useEffect(() => {
        fetchAllCncReservationInfo();
    }, [fetchAllCncReservationInfo]);

    type CncFormData = z.infer<typeof cncHeatSchema>;

    const {register, handleSubmit, formState: {errors}, setValue, getValues, reset} = useForm<CncFormData>({
        resolver: zodResolver(cncHeatSchema),
        defaultValues: {
            check: false,
            date: "",
        }
    });

    // 예약 날짜 선택
    const handleDateSelect = (date: string) => {
        setValue("date", date);
        setShowCalendar(false);
    };

    // CNC 예약 요청
    const submitHandler:SubmitHandler<CncFormData> = useCallback(async (data) => {
        try {
            const response = await sendRequest({
                url: "/reservations/cncs",
                method: "post",
                data: data,
            });
            if (response.data) {
                // 예약 완료 페이지로 이동
                setTimeout(() => {
                    navigate("/reservation/done", {replace:true});
                }, 300);
            }
        } catch (err) {
            console.error("CNC 예약 요청 중 에러 발생: ", err);
            reset();
        }
    }, [sendRequest]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) {
            showToast(errorText, "error");
            const errorTimer = setTimeout(clearError, 6000);
            return () => clearTimeout(errorTimer);
        }
    }, [errorText, clearError, showToast]);

    return (
        <Container>
            <HeadTag title={headerCategories.cncReservationHeader[lang]}/>

            <Header
                leftChild={<ArrowBack/>}
                centerText={headerCategories.cncReservationHeader[lang]}
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
                                {inputCategories.check[lang]}
                            </label>
                        </div>

                        <div>
                            <span>{messageCategories.cncRule[lang]}</span>
                            <p>{messageCategories.cncDescription[lang]}</p>
                        </div>

                        {errors.check?.message &&
                          <p>{errors.check.message}</p>
                        }
                    </CncCheckWrapper>

                    <Input
                        label={inputCategories.twoDayLaterDate[lang]}
                        subLabel={messageCategories.noWeekendAndHoliday[lang]}
                        type={"text"}
                        id={"cnc-reservation-date"}
                        name={"date"}
                        placeholder={placeholderCategories.date[lang]}
                        register={register}
                        errorMessage={errors.date?.message}
                        onClick={() => setShowCalendar(true)}
                        readonly
                    />

                    <Button type={"submit"} content={buttonCategories.reservation[lang]} width={"full"} color={"primary"} scale={"big"}/>
                </form>
            }

            {showCalendar &&
              <Modal
                title={headerCategories.date[lang]}
                content={<Calendar
                    setModal={setShowCalendar}
                    onSelectDate={handleDateSelect}
                    date={getValues("date")}
                    machine={"cnc"}
                    condition={condition}
                />}
                setModal={setShowCalendar}
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
        </Container>
    );
};

export default ReservationCnc;