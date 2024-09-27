import {FC, useCallback, useEffect, useState} from "react";

import Header from "@components/Header";
import LinkCard from "@components/LinkCard";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";

import {machineReservationCategories} from "@constants/machineCategories.ts";
import {Container, HeaderWrapper} from "./style.ts";
import useRequest from "@hooks/useRequest.ts";

import reservation from "@assets/images/reservation.png";


const ReservationHeaderLeft = () => {
    return (
        <HeaderWrapper>
            <img src={reservation} alt="예약"/>
            <h2>예약</h2>
        </HeaderWrapper>

    );
};

const ReservationPage:FC = () => {
    const [machineStatus, setMachineStatus] = useState({laser: false, printer: false, heat: false, saw: false, vacuum: false, cnc: false});

    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    const fetchMachineStatus = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/machines/status",
            });
            if (response.data) {
                setMachineStatus(response.data);
            }
        } catch (err) {
            console.error("기기 상태 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchMachineStatus();
    }, [fetchMachineStatus]);

    return (
        <Container>
            <Header leftChild={<ReservationHeaderLeft/>}/>
            <p>예약하실 기기를 선택해주세요</p>
            {isLoading ?
                <LoadingLoop/>
                :
                <div>
                    {machineReservationCategories.map((machine, index) => (
                        <LinkCard
                            key={index}
                            image={machine.image}
                            name={machine.name}
                            to={machine.link as string}
                            type={"grid"}
                            isDisabled={!machineStatus[machine.type]}
                        />
                    ))}
                </div>
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

export default ReservationPage;