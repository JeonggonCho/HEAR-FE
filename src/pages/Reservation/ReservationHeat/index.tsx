import {FC, useCallback, useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {ReactSVG} from "react-svg";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import MachineSchemaProvider from "@schemata/MachineSchemaProvider.ts";
import {getTomorrowDate, getAfterWeekDate} from "@util/calculateDate.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";

import {Container, HeatCheckWrapper, ImageWrapper, ReturnDateWrapper} from "./style.ts";

import heat from "@assets/images/heat_cutter.png";
import check from "@assets/icons/check.svg";


const ReservationHeat:FC = () => {
    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();
    const {cncHeatSchema} = MachineSchemaProvider();

    type HeatFormData = z.infer<typeof cncHeatSchema>;

    const formattedDate = getTomorrowDate();
    const formattedReturnDate = getAfterWeekDate(false);

    const {register, handleSubmit, formState: {errors}, reset, setValue, getValues} = useForm<HeatFormData>({
        resolver: zodResolver(cncHeatSchema),
        defaultValues: {
            check: false,
            date: formattedDate,
        }
    });

    // 예약 날짜 고정
    useEffect(() => {
        setValue("date", formattedDate);
    }, []);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 열선 예약 요청
    const submitHandler:SubmitHandler<HeatFormData> = useCallback(async (data) => {
        try {
            await sendRequest({
                url: "/reservations/heats",
                method: "post",
                data: data,
            });
            navigate("/reservation/done", {replace: true});
        } catch (err) {
            console.error("열선 예약 요청 중 에러 발생: ", err);
            reset();
        }
    }, [sendRequest, reset]);

    return (
        <Container>
            <HeadTag title={headerCategories.heatReservationHeader[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.heatReservationHeader[lang]}/>
            <ImageWrapper>
                <img src={heat} alt={"열선"}/>
            </ImageWrapper>
            {isLoading ?
                <LoadingLoop/>
                :
                <form onSubmit={handleSubmit(submitHandler)}>
                    <HeatCheckWrapper>
                        <div>
                            <input
                                type={"checkbox"}
                                id={"heatWarning"}
                                onClick={() => setValue("check", !getValues("check"))}
                            />
                            <label htmlFor={"heatWarning"}>
                                <div><ReactSVG src={check}/></div>
                                {inputCategories.check[lang]}
                            </label>
                        </div>

                        <div>
                            <span>{messageCategories.heatRule[lang]}</span>
                            <p>{messageCategories.heatDescription[lang]}</p>
                        </div>

                        {errors.check?.message &&
                          <p>{errors.check.message}</p>
                        }
                    </HeatCheckWrapper>

                    <Input
                        label={inputCategories.tomorrowRentalDate[lang]}
                        subLabel={messageCategories.noWeekendAndHoliday[lang]}
                        type={"text"}
                        id={"heat-reservation-date"}
                        name={"date"}
                        placeholder={placeholderCategories.date[lang]}
                        register={register}
                        errorMessage={errors.date?.message}
                        disabled={true}
                    />

                    <ReturnDateWrapper>
                        {cardCategories.return[lang]} <span>{formattedReturnDate}</span>
                    </ReturnDateWrapper>

                    <Button type={"submit"} content={buttonCategories.reservation[lang]} width={"full"} color={"primary"} scale={"big"}/>
                </form>
            }
        </Container>
    );
};

export default ReservationHeat;