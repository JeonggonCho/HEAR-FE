import {FC, useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";
import {useNavigate} from "react-router-dom";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import RoomMap from "@components/reservation/RoomMap";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import Modal from "@components/common/Modal/Modal.tsx";
import LoadingLoop from "@components/common/LoadingLoop";
import LaserSelectContent from "@components/reservation/LaserSelectContent";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import {getTomorrowDate} from "@util/calculateDate.ts";
import {ILaserInfo, ILaserReservation, ILaserTimesinfo} from "@/types/reservation.ts";
import {useUserDataStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";

import {Container, EmptyMessage, ImageWrapper, MapIcon, SelectedItemWrapper} from "./style.ts";

import laser from "@assets/images/laser_cut.png";
import mapIcon from "@assets/icons/map.svg";
import close from "@assets/icons/close.svg";


const ReservationLaser: FC = () => {
    const [reservationList, setReservationList] = useState<ILaserReservation[]>([]);
    const [laserInfo, setLaserInfo] = useState<ILaserInfo[]>([]);
    const [laserTimesInfo, setLaserTimesInfo] = useState<ILaserTimesinfo[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showMap, setShowMap] = useState<boolean>(false);
    const [showEmptyError, setShowEmptyError] = useState<boolean>(false);

    const navigate = useNavigate();

    const {userData, setUserData} = useUserDataStore();
    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    // 레이저 커팅기 이용 날짜인 내일 날짜 계산
    const formattedDate = getTomorrowDate();

    // 레이저 커팅기 기기 및 시간의 상태 정보 조회
    const fetchValidLaserInfo = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/reservations/lasers",
            });
            if (response.data) {
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
            if (response.data && userData) {
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

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

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
                <Header
                    leftChild={<ArrowBack/>}
                    centerText={headerCategories.laserReservationHeader[lang]}
                    rightChild={
                        <MapIcon onClick={() => setShowMap(true)}>
                            <ReactSVG src={mapIcon}/>
                        </MapIcon>
                    }
                    bgColor={true}
                />
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

                                <Button
                                    type={"button"}
                                    content={buttonCategories.selectMachineAndTime[lang]}
                                    width={"full"}
                                    color={"approval"}
                                    scale={"normal"}
                                    onClick={() => setShowModal(true)}
                                />
                            </div>
                        </div>

                        <Button type={"submit"} content={buttonCategories.reservation[lang]} width={"full"} color={"primary"} scale={"big"}/>
                    </form>
                }
            </Container>

            {showModal &&
              <Modal
                title={buttonCategories.selectMachineAndTime[lang]}
                content={
                    <LaserSelectContent
                        laserInfo={laserInfo}
                        laserTimesInfo={laserTimesInfo}
                        reservationList={reservationList}
                        setReservationList={setReservationList}
                        setModal={setShowModal}
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
        </>
    );
};

export default ReservationLaser;