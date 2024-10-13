import {FC, useCallback, useEffect, useState} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import LoadingLoop from "@components/common/LoadingLoop";
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

// 기기별로 나누기보다 시간순으로 보도록하기
const dummy = [
        {
            machine: "laser",
            _id: "1",
            date: 2024-10-13,
            machineId: "1",
            startTime: "10:00",
            endTime: "11:00",
            machineName: "1호기",
        },
        {
            machine: "laser",
            _id: "2",
            date: 2024-10-13,
            machineId: "2",
            startTime: "14:00",
            endTime: "15:00",
            machineName: "2호기",
        },
        {
            machine: "printer",
            _id: "3",
            date: 2024-10-13,
            machineId: "3",
            machineName: "1호기",
        },
        {
            machine: "printer",
            _id: "4",
            date: 2024-10-16,
            machineId: "3",
            machineName: "1호기",
        },
];

const MyReservationsPage:FC = () => {
    const [reservations, setReservations] = useState();

    const {isLoading, sendRequest, errorText, clearError} = useRequest();
    const {lang} = useThemeStore();

    // 내 예약 내역 조회
    const fetchMyReservations = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "",
            });
            if (response.data) {
                setReservations(response.data);
            }
        } catch (err) {
            console.error("내 예약 내역 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, setReservations]);

    useEffect(() => {
        fetchMyReservations();
    }, [fetchMyReservations]);

    // 내 예약 취소
    const deleteReservation = useCallback(async (data:any) => {
        const response = await sendRequest({
            url: "",
            method: "delete",
            data: data,
        });
        if (response.data) {

        }
    }, [sendRequest, setReservations]);

    return (
        <>
            <HeadTag title={headerCategories.myReservations[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.myReservations[lang]}/>

            {isLoading ?
                <LoadingLoop/>
                :
                <></>
            }

            {errorText &&
                <Modal
                  content={<ErrorContent text={errorText} closeModal={clearError}/>}
                  setModal={clearError}
                  type={"popup"}
                />
            }
        </>
    );
};

export default MyReservationsPage;