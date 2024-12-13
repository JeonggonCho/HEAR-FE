import {useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";
import {useNavigate} from "react-router-dom";
import {Header} from "@components/common/Header";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import MapModal from "@components/common/Modal/MapModal.tsx";
import LaserSelect from "@components/reservation/LaserSelect";
import ArrowBack from "@components/common/ArrowBack";
import useRequest from "@hooks/useRequest.ts";
import {getTomorrowDate} from "@util/calculateDate.ts";
import {ILaserInfo, ILaserReservation, ILaserTimesinfo} from "@/types/reservation.ts";
import {useUserDataStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {Container, EmptyMessage, ImageWrapper, SelectedItemWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import laser from "@assets/images/laser_cut.png";
import mapIcon from "@assets/icons/map.svg";
import close from "@assets/icons/close.svg";
import Icon from "@components/common/Icon";


const ReservationLaser = () => {
    const [reservationList, setReservationList] = useState<ILaserReservation[]>([]);
    const [laserInfo, setLaserInfo] = useState<ILaserInfo[]>([]);
    const [laserTimesInfo, setLaserTimesInfo] = useState<ILaserTimesinfo[]>([]);
    const [showEmptyError, setShowEmptyError] = useState<boolean>(false);

    const navigate = useNavigate();
    const {userData, setUserData} = useUserDataStore();
    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest} = useRequest();

    // 레이저 커팅기 이용 날짜인 내일 날짜 계산
    const formattedDate = getTomorrowDate();

    // 레이저 커팅기 기기 및 시간의 상태 정보 조회
    const fetchValidLaserInfo = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/reservations/lasers",
            });
            if (response?.data) {
                setLaserInfo(response.data.laserInfo);
                setLaserTimesInfo(response.data.laserTimesInfo);
            }
        } catch (err) {
            console.error("레이저 커팅기 시간 정보 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, setLaserInfo, setLaserTimesInfo]);

    useEffect(() => {
        fetchValidLaserInfo();
    }, [fetchValidLaserInfo]);

    // 레이저 커팅기 기기 및 시간 선택 아이템 삭제
    const handleRemoveReservationItem = (reservation:ILaserReservation) => {
        setReservationList(prevState => prevState.filter(value =>
            !(value.laserId === reservation.laserId && value.startTime === reservation.startTime && value.endTime === reservation.endTime)
        ));
    };

    // 레이저 커팅기 예약 요청
    const submitHandler = useCallback(async (e:any) => {
        e.preventDefault();
        if (reservationList.length === 0) {
            setShowEmptyError(true); // 선택한 기기 및 시간이 없을 경우, 에러 모달 띄우기
            return;
        }
        try {
            const response = await sendRequest({
                url: "/reservations/lasers",
                method: "post",
                data: reservationList.map((value) => ({
                    date: formattedDate,
                    machineId: value.laserId,
                    startTime: value.startTime,
                    endTime: value.endTime,
                })),
            });
            if (response?.data && userData) {
                // 레이저 커팅기 예약 가능 일주일 횟수와 오늘 횟수 차감하기
                const updatedUserData = {
                    ...userData,
                    countOfLaserPerWeek: (userData?.countOfLaserPerWeek as number) - reservationList.length,
                    countOfLaserPerDay: (userData?.countOfLaserPerDay as number) - reservationList.length
                };
                setUserData(updatedUserData);

                // 예약 완료 페이지로 이동
                setTimeout(() => {
                    navigate("/reservation/done", {replace:true});
                }, 300);
            }
        } catch (err) {
            console.error("레이저 커팅기 예약 중 에러 발생: ", err);
        }
    }, [sendRequest, reservationList]);

    // 공란 에러 메시지
    useEffect(() => {
        if (showEmptyError) {
            showToast(messageCategories.emptyMachineAndTime[lang], "error");
            const errorTimer = setTimeout(() => setShowEmptyError(false), 6000);
            return () => clearTimeout(errorTimer);
        }
    }, [showEmptyError, setShowEmptyError, showToast]);

    return (
        <>
            <Container>
                <HeadTag title={headerCategories.laserReservationHeader[lang]}/>

                <Header bgColor={true}>
                    <Grid align={"center"} columns={3} style={{width: "100%"}}>
                        <Header.Left>
                            <ArrowBack/>
                        </Header.Left>
                        <Header.Center>
                            <h2 css={headerCenter}>{headerCategories.laserReservationHeader[lang]}</h2>
                        </Header.Center>
                        <Header.Right>
                            <MapModal
                                trigger={<Icon svg={mapIcon} isHovered={true}/>}
                                machine={"laser"}
                            />
                        </Header.Right>
                    </Grid>
                </Header>

                <ImageWrapper>
                    <img src={laser} alt={"레이저 커팅기"}/>
                </ImageWrapper>
                {isLoading ?
                    <LoadingLoop/>
                    :
                    <form onSubmit={submitHandler}>
                        <Input
                            label={inputCategories.tomorrowDate[lang]}
                            subLabel={messageCategories.noWeekendAndHoliday[lang]}
                            type={"text"}
                            id={"laser-reservation-date"}
                            value={formattedDate}
                            name={"date"}
                            placeholder={placeholderCategories.date[lang]}
                            disabled={true}
                        />

                        <div>
                            <label>{inputCategories.machineAndTime[lang]}</label>
                            <div>
                                {reservationList.length === 0 ?
                                    <EmptyMessage>{messageCategories.emptyMachineAndTime[lang]}</EmptyMessage>
                                    :
                                    <>
                                        {reservationList.map((reservation) => {
                                            const selectedLaserInfo = laserInfo.filter(value => value.laserId === reservation.laserId)[0];
                                            const selectedLaserTimeInfo = laserTimesInfo.filter(value => value.startTime === reservation.startTime && value.endTime === reservation.endTime)[0];
                                            return (
                                                <SelectedItemWrapper key={`${reservation.laserId} ${reservation.startTime} ${reservation.endTime}`}>
                                                    <span>{selectedLaserInfo.laserName}</span>
                                                    <span>{`${selectedLaserTimeInfo.startTime} - ${selectedLaserTimeInfo.endTime}`}</span>
                                                    <div onClick={() => handleRemoveReservationItem(reservation)}>
                                                        <ReactSVG src={close}/>
                                                    </div>
                                                </SelectedItemWrapper>
                                            );
                                        })}
                                    </>
                                }

                                <LaserSelect
                                    laserInfo={laserInfo}
                                    laserTimesInfo={laserTimesInfo}
                                    reservationList={reservationList}
                                    setReservationList={setReservationList}
                                />
                            </div>
                        </div>

                        <Button
                            type={"submit"}
                            variant={"filled"}
                            width={"full"}
                            color={"primary"}
                            size={"lg"}
                            disabled={reservationList.length === 0}
                        >
                            {buttonCategories.reservation[lang]}
                        </Button>
                    </form>
                }
            </Container>
        </>
    );
};

export default ReservationLaser;