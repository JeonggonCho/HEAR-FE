import {useCallback, useEffect, useState} from "react";
import {Header} from "@components/common/Header";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";
import Flex from "@components/common/Flex";
import Card from "@components/common/Card";
import Empty from "@components/common/Empty";
import ReservationListItem from "@components/reservation/ReservationListItem";
import DeleteSelectedReservations from "@components/reservation/DeleteSelectedReservations";
import Grid from "@components/common/Grid";
import Icon from "@components/common/Icon";
import ArrowBack from "@components/common/ArrowBack";
import useRequest from "@hooks/useRequest.ts";
import {IReservation} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {ReservationControlWrapper, ReservationListItemWrapper, SelectAllWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {machineName} from "@constants/machineCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import check from "@assets/icons/check.svg";


export type ReservationArgumentsType = {_id: string, machine: "laser" | "printer" | "heat" | "saw" | "vacuum" | "cnc", date: string}


const MyReservationsPage = () => {
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [filter, setFilter] = useState("all");
    const [selectedReservations, setSelectedReservations] = useState<ReservationArgumentsType[]>([]);

    const {lang} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();

    // 내 예약 내역 조회
    const fetchMyReservations = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/reservations/me?filter=${filter}`,
            });
            if (response.data) {
                setReservations(response.data);
            }
        } catch (err) {
            console.error("내 예약 내역 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, setReservations, filter]);

    useEffect(() => {
        fetchMyReservations();
    }, [fetchMyReservations, filter]);

    // 예약 취소
    const deleteReservations = async (target: ReservationArgumentsType[]) => {
        const query = target.map(r => `ids[]=${r._id}&machines[]=${r.machine}&date[]=${r.date}`).join("&");

        const response = await sendRequest({
            url: `/reservations?${query}`,
            method: "delete",
        });
        if (response.data) {
            const deletedReservations = response.data;

            setReservations(prevReservations =>
                prevReservations.filter(reservation =>
                    !deletedReservations.some((deleted: ReservationArgumentsType) =>
                        reservation._id === deleted._id && reservation.machine === deleted.machine
                    )
                )
            );
        }
    };

    // 예약 체크 선택하기
    const selectHandler = (target: ReservationArgumentsType) => {
        setSelectedReservations(prevSelected => {
            const isAlreadySelected = prevSelected.some(
                (reservation) => reservation._id === target._id && reservation.machine === target.machine && reservation.date === target.date
            );
            if (isAlreadySelected) {
                // 이미 선택된 경우, 선택 해제
                return prevSelected.filter(
                    (reservation) => !(reservation._id === target._id && reservation.machine === target.machine && reservation.date === target.date)
                );
            } else {
                // 선택되지 않은 경우, 선택 추가
                return [...prevSelected, target];
            }
        });
    };

    // 전체 선택하기 한번 더 클릭 시, 전체 해제하기
    const selectAllHandler = () => {
        if (selectedReservations.length === reservations.length) {
            // 모두 선택된 상태라면, 전체 해제
            setSelectedReservations([]);
        } else {
            // 전체 선택
            const allReservations = reservations.map(reservation => ({
                _id: reservation._id,
                machine: reservation.machine,
                date: reservation.date,
            }));
            setSelectedReservations(allReservations);
        }
    };

    return (
        <>
            <HeadTag title={headerCategories.myReservations[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.myReservations[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <ReservationControlWrapper>
                <div>
                    {/*전체 선택*/}
                    <SelectAllWrapper>
                        <input
                            type={"checkbox"}
                            id={"select-all"}
                            onChange={selectAllHandler}
                            checked={reservations.length > 0 && selectedReservations.length === reservations.length}
                        />
                        <label htmlFor={"select-all"}>
                            <Icon svg={check}/>
                        </label>
                        <label htmlFor={"select-all"}>{buttonCategories.selectAll[lang]}</label>
                    </SelectAllWrapper>

                    {/*선택 삭제*/}
                    <DeleteSelectedReservations
                        selectedReservations={selectedReservations}
                        setSelectedReservations={setSelectedReservations}
                        deleteReservations={deleteReservations}
                    />
                </div>

                {/*기기 필터링*/}
                <select
                    onChange={(e) => {
                        setFilter(e.target.value);
                        setSelectedReservations([]);
                    }}
                >
                    <option value={"all"}>{buttonCategories.selectMachine[lang]}</option>
                    <option value={"laser"}>{machineName.laser[lang]}</option>
                    <option value={"printer"}>{machineName.printer[lang]}</option>
                    <option value={"heat"}>{machineName.heat[lang]}</option>
                    <option value={"saw"}>{machineName.saw[lang]}</option>
                    <option value={"vacuum"}>{machineName.vacuum[lang]}</option>
                    <option value={"cnc"}>{machineName.cnc[lang]}</option>
                </select>
            </ReservationControlWrapper>

            {isLoading ?
                <Card padding={0} borderRadius={0} bgColor={"sub"}>
                    <Flex align={"center"} justify={"center"} style={{height: "70vh"}}>
                        <LoadingLoop/>
                    </Flex>
                </Card>
                :
                <>
                    {reservations.length > 0 ?
                        <ReservationListItemWrapper>
                            {reservations.map((reservation) => (
                                <ReservationListItem
                                    key={`${reservation._id}-${reservation.date}`}
                                    reservation={reservation}
                                    deleteHandler={deleteReservations}
                                    isSelected={selectedReservations.some(
                                        selected => selected._id === reservation._id && selected.machine === reservation.machine && selected.date === reservation.date
                                    )}
                                    selectHandler={() => selectHandler({ _id: reservation._id, machine: reservation.machine, date: reservation.date })}
                                />
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
        </>
    );
};

export default MyReservationsPage;