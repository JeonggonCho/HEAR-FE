import {useCallback, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {ReactSVG} from "react-svg";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Header} from "@components/common/Header";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import {Modal} from "@components/common/Modal";
import Calendar from "@components/common/Calendar";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";
import InputMessage from "@components/common/InputMessage";
import Grid from "@components/common/Grid";
import ArrowBack from "@components/common/ArrowBack";
import useRequest from "@hooks/useRequest.ts";
import MachineSchemaProvider from "@schemata/MachineSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {Container, ImageWrapper, TimeWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import saw from "@assets/images/saw.png";
import close from "@assets/icons/close.svg";


const ReservationSaw = () => {
    const [condition, setCondition] = useState([]);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [showTooltip, setShowTooltip] = useState<boolean>(true);

    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();
    const {sawVacuumSchema} = MachineSchemaProvider();

    // 현재 톱 예약 상태 가져오기
    const fetchAllSawReservationInfo = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/reservations/saws",
            });
            if (response.data) {
                setCondition(response.data);
            }
        } catch (err) {
            console.error("톱 예약 현황 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, setCondition]);

    useEffect(() => {
        fetchAllSawReservationInfo();
    }, [fetchAllSawReservationInfo]);

    type SawFormData = z.infer<typeof sawVacuumSchema>;

    const {register, handleSubmit, formState: {errors}, setValue, reset, getValues} = useForm<SawFormData>({
        resolver: zodResolver(sawVacuumSchema),
        defaultValues: {
            date: "",
            startTime: "",
            endTime: "",
        }
    });

    // 날짜 선택
    const handleDateSelect = (date: string) => {
        setValue("date", date);
        setShowCalendar(false);
    };

    // 톱 예약 요청
    const submitHandler:SubmitHandler<SawFormData> = useCallback(async (data) => {
        try {
            const response = await sendRequest({
                url: "/reservations/saws",
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
            console.error("톱 예약 요청 중 에러 발생: ", err);
            reset();
        }
    }, [sendRequest]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    return (
        <>
            <Container tooltip={showTooltip}>
                <HeadTag title={headerCategories.sawReservationHeader[lang]}/>

                <Header>
                    <Grid align={"center"} columns={3} style={{width: "100%"}}>
                        <Header.Left>
                            <ArrowBack/>
                        </Header.Left>
                        <Header.Center>
                            <h2 css={headerCenter}>{headerCategories.sawReservationHeader[lang]}</h2>
                        </Header.Center>
                    </Grid>
                </Header>

                <ImageWrapper>
                    <img src={saw} alt={"톱"}/>
                </ImageWrapper>
                {isLoading ?
                    <LoadingLoop/>
                    :
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Input
                            label={inputCategories.date[lang]}
                            subLabel={messageCategories.noWeekendAndHoliday[lang]}
                            type={"text"}
                            id={"saw-reservation-date"}
                            name={"date"}
                            placeholder={placeholderCategories.date[lang]}
                            register={register}
                            errorMessage={errors.date?.message}
                            onClick={() => setShowCalendar(true)}
                            readonly
                        />

                        <TimeWrapper tooltip={showTooltip.toString()}>
                            <div>
                                <label>{inputCategories.wantedTime[lang]}</label>
                                {showTooltip &&
                                  <div>
                                    <span>{messageCategories.changeTime[lang]}</span>
                                    <ReactSVG src={close} onClick={() => setShowTooltip(false)}/>
                                  </div>
                                }
                            </div>

                            <div>
                                <select
                                    onChange={(e) => setValue("startTime", e.target.value)}
                                >
                                    <option value={""}>{placeholderCategories.startTime[lang]}</option>
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
                                    <option value={""}>{placeholderCategories.endTime[lang]}</option>
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
                            {errors.startTime?.message && <InputMessage message={errors.startTime.message} type={"error"}/>}
                            {errors.endTime?.message && <InputMessage message={errors.endTime.message} type={"error"}/>}
                        </TimeWrapper>

                        <Button
                            type={"submit"}
                            variant={"filled"}
                            width={"full"}
                            color={"primary"}
                            size={"lg"}
                        >
                            {buttonCategories.reservation[lang]}
                        </Button>
                    </form>
                }
            </Container>

            {showCalendar &&
              <Modal
                title={headerCategories.date[lang]}
                content={
                    <Calendar
                        calendarType={"reservation"}
                        setModal={setShowCalendar}
                        onSelectDate={handleDateSelect}
                        date={getValues("date")}
                        machine={"saw"}
                        condition={condition}
                        selectWeekend={false}
                    />}
                setModal={setShowCalendar}
                type={"bottomSheet"}
              />
            }
        </>
    );
};

export default ReservationSaw;