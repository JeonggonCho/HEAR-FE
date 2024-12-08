import {useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";
import {Header} from "@components/common/Header";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";
import Empty from "@components/common/Empty";
import ReservationListItem from "@components/reservation/ReservationListItem";
import {Modal} from "@components/common/Modal";
import ModalConfirmContent from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import Grid from "@components/common/Grid";
import ArrowBack from "@components/common/ArrowBack";
import useRequest from "@hooks/useRequest.ts";
import {IReservation} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {ReservationControlWrapper, ReservationListItemWrapper, SelectAllWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {machineName} from "@constants/machineCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import check from "@assets/icons/check.svg";


type ReservationArgumentsType = {_id: string, machine: "laser" | "printer" | "heat" | "saw" | "vacuum" | "cnc", date: string}


const MyReservationsPage = () => {
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [filter, setFilter] = useState("all");
    const [selectedReservations, setSelectedReservations] = useState<ReservationArgumentsType[]>([]);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showEmptySelect, setShowEmptySelect] = useState<boolean>(false);
    const [successDeleteReservation, setSuccessDeleteReservation] = useState<boolean>(false);

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();

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
    const deleteReservations = useCallback(async (target: ReservationArgumentsType[]) => {
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

            setSuccessDeleteReservation(true);
        }
    }, [sendRequest, setReservations]);

    // 선택된 내역 예약 취소
    const deleteSelectedReservations = useCallback(async () => {
        if (selectedReservations.length === 0) return;
        await deleteReservations(selectedReservations);
        setSelectedReservations([]);
        setShowConfirmModal(false);
    }, [selectedReservations, deleteReservations]);

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

    // 선택된 예약 삭제 확인 모달 핸들러
    const deleteConfirmHandler = () => {
        selectedReservations.length === 0 ? setShowEmptySelect(true) : setShowConfirmModal(true);
    };

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 공란 에러 메시지
    useEffect(() => {
        if (showEmptySelect) showToast(messageCategories.emptySelectedReservation[lang], "error");
        const errorTimer = setTimeout(() => setShowEmptySelect(false), 6000);
        return () => clearTimeout(errorTimer);
    }, [showEmptySelect]);

    // 삭제 성공 메시지
    useEffect(() => {
        if (successDeleteReservation) showToast(messageCategories.deleteDone[lang], "success");
        const errorTimer = setTimeout(() => setSuccessDeleteReservation(false), 6000);
        return () => clearTimeout(errorTimer);
    }, [successDeleteReservation]);

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
                            <ReactSVG src={check}/>
                        </label>
                        <label htmlFor={"select-all"}>{buttonCategories.selectAll[lang]}</label>
                    </SelectAllWrapper>

                    {/*선택 예약 취소(삭제)*/}
                    <div onClick={deleteConfirmHandler}>
                        <span>{buttonCategories.deleteSelectedReservations[lang]}</span>
                        {selectedReservations.length > 0 && <span>{`(${ selectedReservations.length})`}</span>}
                    </div>
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
                <LoadingLoop/>
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

            {showConfirmModal &&
                <Modal
                  content={
                    <ModalConfirmContent
                        text={messageCategories.confirmDeleteSelectedReservation[lang]}
                        leftBtn={
                            <Button
                                type={"button"}
                                variant={"filled"}
                                color={"third"}
                                size={"md"}
                                width={"full"}
                                onClick={() => setShowConfirmModal(false)}
                            >
                                {buttonCategories.close[lang]}
                            </Button>
                        }
                        rightBtn={
                            <Button
                                type={"button"}
                                variant={"filled"}
                                color={"danger"}
                                size={"md"}
                                width={"full"}
                                onClick={() => deleteSelectedReservations()}
                            >
                                {buttonCategories.delete[lang]}
                            </Button>
                        }
                    />}
                  setModal={() => setShowConfirmModal(false)}
                  type={"popup"}
                />
            }
        </>
    );
};

export default MyReservationsPage;