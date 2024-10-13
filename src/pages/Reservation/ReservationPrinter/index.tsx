import {FC, useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";
import {useNavigate} from "react-router-dom";
import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import RoomMap from "@components/content/RoomMap";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";
import PrinterSelectContent from "@components/content/PrinterSelectContent";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";

import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {IPrinterReservation} from "@/types/reservation.ts";
import useRequest from "@hooks/useRequest.ts";
import {inputCategories} from "@constants/inputCategories.ts";

import {Container, DateMachineSelectWrapper, EmptyMessage, ImageWrapper, MapIcon} from "./style.ts";

import printer from "@assets/images/3d_printer.png";
import mapIcon from "@assets/icons/map.svg";

const ReservationPrinter:FC = () => {
    const [reservation, setReservation] = useState<IPrinterReservation>();
    const [selectedDate, setSelectedDate] = useState<string>();
    const [selectMachineMode, setSelectMachineMode] = useState<boolean>(false);
    const [selectedMachine, setSelectedMachine] = useState<string>("");
    const [showSelectModal, setShowSelectModal] = useState<boolean>(false);
    const [showMap, setShowMap] = useState<boolean>(false);
    const [showEmptyError, setShowEmptyError] = useState<boolean>(false);

    const {lang} = useThemeStore();

    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    const navigate = useNavigate();

    const fetchValidPrinterInfo = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/reservations/printers"
            });
            if (response.data) {
                console.log(response.data);
            }
        } catch (err) {
            console.error("3D 프린터 정보 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchValidPrinterInfo();
    }, [fetchValidPrinterInfo]);

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setSelectMachineMode(true);
    };

    const handleCloseModal = () => {
        setShowSelectModal(false);
        setSelectMachineMode(false);
        setSelectedDate("");
    };

    const submitHandler = useCallback(async (e: any) => {
        e.preventDefault();
        if (!reservation) {
            setShowEmptyError(true);
            return;
        }
        try {
            const response = await sendRequest({
                url: "/reservations/printers",
                method: "post",
                data: reservation,
            });
            if (response.data) {
                setTimeout(() => {
                    navigate("/reservation/done", {replace:true});
                }, 300);
            }
        } catch (err) {
            console.error("3D 프린터 예약 중 에러 발생: ", err);
        }
    }, [sendRequest, reservation]);

    return (
        <Container>
            <HeadTag title={headerCategories.printerReservationHeader[lang]}/>

            <Header
                leftChild={<ArrowBack/>}
                centerText={headerCategories.printerReservationHeader[lang]}
                rightChild={
                    <MapIcon onClick={() => setShowMap(true)}>
                        <ReactSVG src={mapIcon}/>
                    </MapIcon>
                }
            />
            <ImageWrapper>
                <img src={printer} alt={"3d 프린터"}/>
            </ImageWrapper>
            {isLoading ?
                <LoadingLoop/>
                :
                <form onSubmit={submitHandler}>
                    <DateMachineSelectWrapper>
                        <label>{inputCategories.selectDateAndMachine[lang]}</label>
                        <span>{messageCategories.noWeekendAndHoliday[lang]}</span>
                        <div>
                            {!reservation ?
                                <EmptyMessage>{messageCategories.emptyDateAndMachine[lang]}</EmptyMessage>
                                :
                                <div>
                                </div>
                            }

                            <Button
                                type={"button"}
                                content={reservation ? `${buttonCategories.change[lang]}` : `${buttonCategories.selectDateAndMachine[lang]}`}
                                width={"full"}
                                color={"approval"}
                                scale={"normal"}
                                onClick={() => setShowSelectModal(true)}
                            />
                        </div>
                    </DateMachineSelectWrapper>

                    <Button type={"submit"} content={buttonCategories.reservation[lang]} width={"full"}
                            color={"primary"} scale={"big"}/>
                </form>
            }

            {showSelectModal &&
              <Modal
                title={selectMachineMode ? (
                    <div style={{display:"flex", alignItems:"center"}}>
                        <ArrowBack action={() => setSelectMachineMode(false)}/>
                        <h3>{inputCategories.selectMachine[lang]}</h3>
                    </div>
                ) : headerCategories.date[lang]}
                content={<PrinterSelectContent
                    setModal={handleCloseModal}
                    onSelectDate={handleDateSelect}
                    selectedDate={selectedDate}
                    selectMachineMode={selectMachineMode}
                    setSelectMachineMode={setSelectMachineMode}
                    selectedMachine={selectedMachine}
                    setSelectedMachine={setSelectedMachine}
                    setReservation={setReservation}
                />}
                setModal={handleCloseModal}
                type={"bottomSheet"}
              />
            }

            {showMap &&
              <Modal
                content={<RoomMap machine={"printer"} setModal={setShowMap}/>}
                setModal={setShowMap}
                type={"popup"}
              />
            }

            {showEmptyError &&
              <Modal
                content={<ErrorContent
                    text={messageCategories.emptyDateAndMachine[lang]}
                    closeModal={() => setShowEmptyError(false)}
                />}
                setModal={setShowEmptyError}
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

export default ReservationPrinter;