import {useCallback, useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Header} from "@components/common/Header";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import Icon from "@components/common/Icon";
import ArrowBack from "@components/common/ArrowBack";
import useRequest from "@hooks/useRequest.ts";
import MachineSchemaProvider from "@schemata/MachineSchemaProvider.ts";
import {getTomorrowDate, getAfterWeekDate} from "@util/calculateDate.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container, HeatCheckWrapper, ImageWrapper, ReturnDateWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import heat from "@assets/images/heat_cutter.png";
import check from "@assets/icons/check.svg";


const ReservationHeat = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();
    const {cncHeatSchema} = MachineSchemaProvider();

    type HeatFormData = z.infer<typeof cncHeatSchema>;

    const formattedDate = getTomorrowDate();
    const formattedReturnDate = getAfterWeekDate(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
        getValues
    } = useForm<HeatFormData>({
        resolver: zodResolver(cncHeatSchema),
        defaultValues: {
            check: false,
            date: formattedDate,
        },
        mode: "onChange",
    });

    // 예약 날짜 고정
    useEffect(() => {
        setValue("date", formattedDate);
    }, []);

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

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.heatReservationHeader[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

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
                                <div><Icon svg={check}/></div>
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
    );
};

export default ReservationHeat;