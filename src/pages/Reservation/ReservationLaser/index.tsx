import {FC, useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import RoomMap from "@components/content/RoomMap";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import Modal from "@components/common/Modal";
import LoadingLoop from "@components/common/LoadingLoop";
import ErrorContent from "@components/content/ErrorContent";
import LaserSelectContent from "@components/content/LaserSelectContent";

import useRequest from "@hooks/useRequest.ts";
import {getTomorrowDate} from "@util/calculateDate.ts";
import {ILaserInfo, ILaserReservation, ILaserTimesinfo} from "@/types/reservation.ts";

import {Container, ImageWrapper, MapIcon, SelectedItemWrapper} from "./style.ts";

import laser from "@assets/images/laser_cut.png";
import mapIcon from "@assets/icons/map.svg";
import close from "@assets/icons/close.svg";

const ReservationLaser: FC = () => {
    const [reservationList, setReservationList] = useState<ILaserReservation[]>([]);
    const [laserInfo, setLaserInfo] = useState<ILaserInfo[]>([]);
    const [laserTimesInfo, setLaserTimesInfo] = useState<ILaserTimesinfo[]>([]);
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
                setLaserInfo(response.data.laserInfo);
                setLaserTimesInfo(response.data.laserTimesInfo);
            }
        } catch (err) {
            console.error("레이저 커팅기 시간 정보 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, setLaserInfo]);

    useEffect(() => {
        fetchValidLaserInfo();
    }, [fetchValidLaserInfo]);

    const handleRemoveReservationItem = (reservation:ILaserReservation) => {
        setReservationList(prevState => prevState.filter(value =>
            !(value.laserId === reservation.laserId && value.timeId === reservation.timeId)
        ));
    };

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
                                    {reservationList.map((reservation) => {
                                        const selectedLaserInfo = laserInfo.filter(value => value.laserId === reservation.laserId)[0];
                                        const selectedLaserTimeInfo = laserTimesInfo.filter(value => value.timeId === reservation.timeId)[0];
                                        return (
                                            <SelectedItemWrapper key={`${reservation.laserId}-${reservation.timeId}`}>
                                                <span>{selectedLaserInfo.laserName}</span>
                                                <span>{selectedLaserTimeInfo.timeContent}</span>
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
                                content={"+ 기기 및 시간 선택"}
                                width={"full"}
                                color={"approval"}
                                scale={"normal"}
                                onClick={() => setShowModal(true)}
                            />
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
                        laserTimesInfo={laserTimesInfo}
                        reservationList={reservationList}
                        setReservationList={setReservationList}
                        setShowModal={setShowModal}
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