import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {ReactSVG} from "react-svg";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import RoomMap from "@components/content/RoomMap";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import Modal from "@components/common/Modal";
import LoadingLoop from "@components/common/LoadingLoop";
import ErrorContent from "@components/content/ErrorContent";
import Select from "@components/common/Select";

import useRequest from "@hooks/useRequest.ts";
import {getTomorrowDate} from "@util/calculateDate.ts";
import {ILaserSelectContentProps} from "@/types/componentProps.ts";
import {ILaserInfo, ILaserReservation} from "@/types/reservation.ts";
import {useUserDataStore} from "@store/useUserStore.ts";
import {laserTimeSchema} from "@schemata/machineSchema.ts";

import {
    Container,
    CountOfLaserPerDayWrapper, CountOfLaserPerWeekWrapper,
    CountOfLaserWrapper,
    ImageWrapper,
    LaserSelectContentWrapper,
    MapIcon
} from "./style.ts";

import laser from "@assets/images/laser_cut.png";
import mapIcon from "@assets/icons/map.svg";



// 레이저 커팅기 기기 및 시간 선택 모달 내용 컴포넌트
const LaserSelectContent:FC<ILaserSelectContentProps> = ({laserInfo, reservationList, setReservationList}) => {
    const {userData} = useUserDataStore();

    const [countOfLaserPerWeek, setCountOfLaserPerWeek] = useState<number>(userData?.countOfLaserPerWeek || 0);
    const [countOfLaserPerDay, setCountOfLaserPerDay] = useState<number>(userData?.countOfLaserPerDay || 0);

    type LaserTimeFormData = z.infer<typeof laserTimeSchema>;

    const {register, handleSubmit, formState:{errors}, getValues, setValue, watch} = useForm<LaserTimeFormData>({
        resolver: zodResolver(laserTimeSchema),
        defaultValues: {
            laser: "",
            times: [],
        }
    });

    // 레이저 커팅기 기기 목록
    const laserCategories = useMemo(() => laserInfo.map((value:any) => (
        {
            label: value.laserName,
            value: value.laserId,
            id: value.laserId,
            status: !value.laserStatus,
        }
    )), [laserInfo]);

    // 선택 된 레이저 커팅기와 시간 목록
    const selectedLaser = watch("laser");
    const selectedTimes = watch("times");

    // 선택된 레이저 커팅기의 시간목록 가져오기
    const laserTimes = laserInfo.filter((value) => value.laserId === selectedLaser)[0]?.laserTimes || [];

    // 시간 목록
    const timeCategories = laserTimes.map((value) => (
        {
            label: value.time,
            value: value.timeId,
            id: value.timeId,
            status: !value.timeStatus,
        }
    ));

    // 시간 선택 핸들러
    const handleTimeChange = (timeId: string) => {
        const currentTimes = getValues("times") || [];

        if (currentTimes.includes(timeId)) {
            setValue("times", currentTimes.filter((id: string) => id !== timeId));
            setCountOfLaserPerWeek(prevState => prevState + 1);
            setCountOfLaserPerDay(prevState => prevState + 1);
        } else {
            if (currentTimes.length <= Math.min(countOfLaserPerWeek, countOfLaserPerDay)) {
                setValue("times", [...currentTimes, timeId]);
                setCountOfLaserPerWeek(prevState => prevState - 1);
                setCountOfLaserPerDay(prevState => prevState - 1);
            } else {
                return;
            }
        }
    };

    // submit 핸들러
    const submitHandler:SubmitHandler<LaserTimeFormData> = useCallback(async (data) => {
        console.log(data);
    }, []);

    return (
        <LaserSelectContentWrapper onSubmit={handleSubmit(submitHandler)}>
            <CountOfLaserWrapper>
                <label>예약 가능 횟수</label>
                <div>
                    <CountOfLaserPerDayWrapper count={countOfLaserPerDay}>
                        <span>오늘</span>
                        <span>{countOfLaserPerDay}</span>
                    </CountOfLaserPerDayWrapper>
                    <CountOfLaserPerWeekWrapper count={countOfLaserPerWeek}>
                        <span>이번 주</span>
                        <span>{countOfLaserPerWeek}</span>
                    </CountOfLaserPerWeekWrapper>
                </div>
            </CountOfLaserWrapper>

            <Select
                label={"기기 선택"}
                type={"radio"}
                name={"laser"}
                categories={laserCategories}
                register={register}
                errorMessage={errors.laser?.message}
            />

            {/*선택된 레이저 커팅기가 있을 경우 시간목록 보이게 하기*/}
            {selectedLaser &&
              <Select
                label={"시간 선택"}
                type={"checkbox"}
                name={"times"}
                register={register}
                categories={timeCategories}
                values={selectedTimes}
                onSelectChange={handleTimeChange}
                errorMessage={errors.times?.message}
              />
            }

            <Button
                type={"submit"}
                content={"추가하기"}
                width={"full"}
                color={"primary"}
                scale={"normal"}
            />
        </LaserSelectContentWrapper>
    );
};



// 레이저 커팅기 예약 페이지
const ReservationLaser: FC = () => {
    const [reservationList, setReservationList] = useState<ILaserReservation[]>([]);
    const [laserInfo, setLaserInfo] = useState<ILaserInfo[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showMap, setShowMap] = useState<boolean>(false);

    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    const formattedDate = getTomorrowDate();

    const fetchValidLaserInfo = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/machines/lasers/info",
            });
            if (response.data) {
                setLaserInfo(response.data);
            }
        } catch (err) {
            console.error("레이저 커팅기 시간 정보 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, setLaserInfo]);

    useEffect(() => {
        fetchValidLaserInfo();
    }, [fetchValidLaserInfo]);

    return (
        <Container>
            <Header
                leftChild={<ArrowBack/>}
                centerText={"레이저 커팅기 예약"}
                rightChild={
                    <MapIcon onClick={() => setShowMap(true)}>
                        <ReactSVG src={mapIcon}/>
                    </MapIcon>
                }
            />
            <ImageWrapper>
                <img src={laser} alt={"레이저 커팅기"}/>
            </ImageWrapper>
            {isLoading ?
                <LoadingLoop/>
                :
                <form onSubmit={(e) => e.preventDefault()}>
                    <Input
                        label={"날 짜 (다음날만 예약 가능)"}
                        type={"date"}
                        id={"laser-reservation-date"}
                        value={formattedDate}
                        name={"date"}
                        placeholder={"날짜를 선택해주세요"}
                        disabled={true}
                    />

                    <div>
                        <label>기기 및 시간</label>
                        <div>
                            {reservationList.length === 0 ?
                                <p>선택된 기기 및 시간이 없습니다</p>
                                :
                                <>
                                    {reservationList.map((reservation, index) =>
                                        <div key={index}>{reservation.laserId}</div>
                                    )}
                                </>
                            }

                            {reservationList.length < 2 &&
                              <Button
                                type={"button"}
                                content={"+ 기기 및 시간 선택"}
                                width={"full"}
                                color={"approval"}
                                scale={"normal"}
                                onClick={() => setShowModal(true)}
                              />
                            }
                        </div>
                    </div>

                    <Button type={"submit"} content={"예약하기"} width={"full"} color={"primary"} scale={"big"}/>
                </form>
            }

            {showModal &&
              <Modal
                title={"기기 및 시간 선택"}
                content={
                    <LaserSelectContent
                        laserInfo={laserInfo}
                        reservationList={reservationList}
                        setReservationList={setReservationList}
                    />
                }
                setModal={setShowModal}
                type={"bottomSheet"}
              />
            }

            {showMap &&
              <Modal
                content={<RoomMap machine={"laser"} setModal={setShowMap}/>}
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

export default ReservationLaser;