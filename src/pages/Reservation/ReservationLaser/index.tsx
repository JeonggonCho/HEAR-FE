import {FC, useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import RoomMap from "@components/RoomMap";
import Button from "@components/Button";
import Input from "@components/Input";
import Modal from "@components/Modal";
import Empty from "@components/Empty";
import LoadingLoop from "@components/LoadingLoop";
import ErrorContent from "@components/ErrorContent";

import {laserSchema} from "@schemata/machineSchema.ts";
import useRequest from "@hooks/useRequest.ts";

import {Container, ImageWrapper, LaserSelectContentWrapper} from "./style.ts";

import laser from "@assets/images/laser_cut.png";

const LaserSelectContent:FC = () => {

    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const day = (new Date().getDate() + 1).toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return (
        <LaserSelectContentWrapper>
            <Input
                label={"날 짜 (다음날만 예약 가능)"}
                type={"date"}
                id={"laser-reservation-date"}
                name={"date"}
                placeholder={"날짜를 선택해주세요"}
                disabled={true}
            />
            <div>
                <label>기기 선택</label>
            </div>
        </LaserSelectContentWrapper>
    );
};

const ReservationLaser:FC = () => {
    const [reservationList, setReservationList] = useState([]);
    const [] = useState([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showMap, setShowMap] = useState<boolean>(false);
    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    const fetchLaserStatus = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/machines/laser",
            });
        } catch (err) {
            console.error("레이저 커팅기 정보 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        // fetchLaserStatus();
    }, [fetchLaserStatus]);


    return (
        <Container>
            <Header
                leftChild={<ArrowBack/>}
                centerText={"레이저 커팅기 예약"}
                rightChild={<Button
                    type={"button"}
                    content={"약 도"}
                    width={"fit"}
                    color={"second"}
                    scale={"small"}
                    onClick={() => setShowMap(true)}
                />}
            />
            <ImageWrapper>
                <img src={laser} alt={"레이저 커팅기"}/>
            </ImageWrapper>
            {isLoading ?
                <LoadingLoop/>
                :
                <form>
                    <div>
                        <label>시간 및 기기</label>
                        <div>
                            <Button
                                type={"button"}
                                content={"+ 기기 및 시간 선택"}
                                width={"full"}
                                color={"third"}
                                scale={"normal"}
                                onClick={() => setShowModal(true)}
                            />

                            {reservationList.length === 0 ?
                                <Empty title={"선택된 기기 및 시간이 없습니다"}/>
                                :
                                <>
                                    {reservationList.map((reservation, index) =>
                                        <div key={index}>{reservation}</div>
                                    )}
                                </>
                            }
                        </div>
                    </div>

                    <Button type={"submit"} content={"예약하기"} width={"full"} color={"primary"} scale={"big"}/>
                </form>
            }

            {showModal &&
              <Modal
                title={"기기 및 시간 선택"}
                content={<LaserSelectContent/>}
                setModal={setShowModal}
                type={"bottomSheet"}/>
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