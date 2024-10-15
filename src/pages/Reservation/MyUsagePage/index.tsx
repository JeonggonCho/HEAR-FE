import {FC, useCallback, useEffect, useState} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import HeadTag from "@components/common/HeadTag";
import Toast from "@components/common/Toast";
import LoadingLoop from "@components/common/LoadingLoop";
import Empty from "@components/common/Empty";
import Input from "@components/common/Input";
import ReservationListItem from "@components/reservation/ReservationListItem";

import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {machineName} from "@constants/machineCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {IReservation} from "@/types/componentProps.ts";

import {HistoryListItemWrapper, UsageControlWrapper} from "./style.ts";

const MyUsagePage:FC = () => {
    const [history, setHistory] = useState<IReservation[]>([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [filter, setFilter] = useState("all");

    const {isLoading, sendRequest, errorText, clearError} = useRequest();
    const {lang} = useThemeStore();

    const fetchMyHistory = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/reservations/history?filter=${filter}&start=${startDate}&end=${endDate}`,
            });
            if (response.data) {
                setHistory(response.data);
            }
        } catch (err) {
            console.error("내 이용 내역 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, setHistory, filter]);

    useEffect(() => {
        fetchMyHistory();
    }, [fetchMyHistory, filter]);

    return (
        <>
            <HeadTag title={headerCategories.myUsage[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.myUsage[lang]}/>

            <UsageControlWrapper>
                {/*날짜 범위 필터링*/}

                {/*기기 필터링*/}
                <select
                    onChange={e => setFilter(e.target.value)}
                >
                    <option value={"all"}>{buttonCategories.selectMachine[lang]}</option>
                    <option value={"laser"}>{machineName.laser[lang]}</option>
                    <option value={"printer"}>{machineName.printer[lang]}</option>
                    <option value={"heat"}>{machineName.heat[lang]}</option>
                    <option value={"saw"}>{machineName.saw[lang]}</option>
                    <option value={"vacuum"}>{machineName.vacuum[lang]}</option>
                    <option value={"cnc"}>{machineName.cnc[lang]}</option>
                </select>
            </UsageControlWrapper>

            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    {history.length > 0 ?
                        <HistoryListItemWrapper>
                            {history.map((h) =>(
                                <ReservationListItem
                                    key={`${h._id}-${h.date}`}
                                    reservation={h}
                                />
                            ))}
                        </HistoryListItemWrapper>
                        :
                        <Empty
                            title={messageCategories.emptyUsage[lang]}
                            message={messageCategories.makeReservation[lang]}
                        />
                    }
                </>
            }

            {errorText &&
              <Toast text={errorText} setToast={clearError} type={"error"}/>
            }
        </>
    );
};

export default MyUsagePage;