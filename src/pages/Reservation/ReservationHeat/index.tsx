import {FC, useCallback, useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {ReactSVG} from "react-svg";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import LoadingLoop from "@components/common/LoadingLoop";
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";

import {cncHeatSchema} from "@schemata/machineSchema.ts";
import useRequest from "@hooks/useRequest.ts";
import {getTomorrowDate, getAfterWeekDate} from "@util/calculateDate.ts";

import {Container, HeatCheckWrapper, ImageWrapper, ReturnDateWrapper} from "./style.ts";

import heat from "@assets/images/heat_cutter.png";
import check from "@assets/icons/check.svg";

const ReservationHeat:FC = () => {
    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    const navigate = useNavigate();

    type HeatFormData = z.infer<typeof cncHeatSchema>;

    const formattedDate = getTomorrowDate();
    const formattedReturnDate = getAfterWeekDate();

    const {register, handleSubmit, formState: {errors}, reset, setValue, getValues} = useForm<HeatFormData>({
        resolver: zodResolver(cncHeatSchema),
        defaultValues: {
            check: false,
            date: formattedDate,
        }
    });

    useEffect(() => {
        setValue("date", formattedDate);
    }, []);

    const submitHandler:SubmitHandler<HeatFormData> = useCallback(async (data) => {
        console.log(data)
        try {
            await sendRequest({
                url: "/reservations/heat",
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
            <Header leftChild={<ArrowBack/>} centerText={"열선 예약"}/>
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
                                아래 내용을 확인하였습니다
                            </label>
                        </div>

                        <div>
                            <span>[열선 이용 규정]</span>
                            <p>열선 기기는 설계 스튜디오당 1대만 대여할 수 있으며, 사용 기간은 1주일로 제한됩니다. 이 기간 내에 반납하지 않을 경우, 스튜디오 전체 인원에게 경고가 1회씩 부과됩니다.</p>
                        </div>

                        {errors.check?.message &&
                          <p>{errors.check.message}</p>
                        }
                    </HeatCheckWrapper>

                    <Input
                        label={"대여 날짜 (다음날만 대여 가능)"}
                        type={"date"}
                        id={"heat-reservation-date"}
                        name={"date"}
                        placeholder={"날짜를 선택해주세요"}
                        register={register}
                        errorMessage={errors.date?.message}
                        disabled={true}
                    />

                    <ReturnDateWrapper>
                        <span>{formattedReturnDate.split("-").join(". ")}</span>까지 반납
                    </ReturnDateWrapper>

                    <Button type={"submit"} content={"예약하기"} width={"full"} color={"primary"} scale={"big"}/>
                </form>
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

export default ReservationHeat;