import {FC, useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";
import Empty from "@components/common/Empty";
import ReservationListItem from "@components/reservation/ReservationListItem";
import Toast from "@components/common/Toast";

import useRequest from "@hooks/useRequest.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {ReservationControlWrapper, ReservationListItemWrapper, SelectAllWrapper} from "./style.ts";

import check from "@assets/icons/check.svg";

const dummy = [
    {
        machine: "laser",
        _id: "1",
        date: "2024-10-14",
        machineId: "1",
        startTime: "10:00",
        endTime: "11:00",
        machineName: "1호기",
    },
    {
        machine: "vacuum",
        _id: "4",
        date: "2024-10-16",
        machineId: "3",
        machineName: "1호기",
    },
    {
        machine: "heat",
        _id: "2",
        date: "2024-10-14",
        machineId: "2",
        startTime: "14:00",
        endTime: "15:00",
        machineName: "2호기",
    },
    {
        machine: "printer",
        _id: "3",
        date: "2024-10-13",
        machineId: "3",
        machineName: "1호기",
    },
    {
        machine: "printer",
        _id: "4",
        date: "2024-10-16",
        machineId: "3",
        machineName: "1호기",
    },
    {
        machine: "cnc",
        _id: "4",
        date: "2024-10-16",
        machineId: "3",
        machineName: "1호기",
    },
    {
        machine: "saw",
        _id: "4",
        date: "2024-10-16",
        machineId: "3",
        machineName: "1호기",
    },
];

const MyReservationsPage:FC = () => {
    const [reservations, setReservations] = useState(dummy);

    const {isLoading, sendRequest, errorText, clearError} = useRequest();
    const {lang} = useThemeStore();

    // 내 예약 내역 조회
    const fetchMyReservations = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "",
            });
            if (response.data) {
                // setReservations(response.data);
                console.log(response.data);
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

            <ReservationControlWrapper>
                <div>
                    <SelectAllWrapper>
                        <input type={"checkbox"} id={"select-all"}/>
                        <label htmlFor={"select-all"}>
                            <ReactSVG src={check}/>
                        </label>
                        <label htmlFor={"select-all"}>전체 선택</label>
                    </SelectAllWrapper>
                    <div>
                        <span>선택 예약취소</span>
                    </div>
                </div>

                <select>
                <option>기기 선택</option>
                    <option>레이저 커팅기</option>
                    <option>3D 프린터</option>
                    <option>열선</option>
                    <option>톱</option>
                    <option>사출 성형기</option>
                    <option>CNC</option>
                </select>
            </ReservationControlWrapper>

            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    {reservations.length > 0 ?
                        <ReservationListItemWrapper>
                            {reservations.map((reservation, index) => (
                                <ReservationListItem key={`${reservation._id}`} reservation={reservation}/>
                            ))}
                        </ReservationListItemWrapper>
                        :
                        <Empty
                            title={messageCategories.emptyReservation[lang]}
                            message={messageCategories.makeReservation[lang]}
                        />
                    }
                </>
            }

            {errorText &&
              <Toast text={errorText} setToast={clearError}/>
            }
        </>
    );
};

export default MyReservationsPage;