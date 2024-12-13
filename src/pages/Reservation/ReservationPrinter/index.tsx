import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Header} from "@components/common/Header";
import Button from "@components/common/Button";
import {Modal} from "@components/common/Modal";
import PrinterSelectContent from "@components/reservation/PrinterSelectContent";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import MapModal from "@components/common/Modal/MapModal.tsx";
import ArrowBack from "@components/common/ArrowBack";
import useRequest from "@hooks/useRequest.ts";
import {IPrinterReservation} from "@/types/reservation.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {Container, DateMachineSelectWrapper, EmptyMessage, ImageWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import printer from "@assets/images/3d_printer.png";
import mapIcon from "@assets/icons/map.svg";
import Icon from "@components/common/Icon";


const ReservationPrinter = () => {
    const [reservation, setReservation] = useState<IPrinterReservation>();
    const [selectedDate, setSelectedDate] = useState<string>();
    const [selectMachineMode, setSelectMachineMode] = useState<boolean>(false);
    const [selectedMachine, setSelectedMachine] = useState<string>("");
    const [showSelectModal, setShowSelectModal] = useState<boolean>(false);
    const [showEmptyError, setShowEmptyError] = useState<boolean>(false);

    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest} = useRequest();

    const fetchValidPrinterInfo = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/reservations/printers"
            });
            if (response?.data) {
                console.log(response.data);
            }
        } catch (err) {
            console.error("3D 프린터 정보 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchValidPrinterInfo();
    }, [fetchValidPrinterInfo]);

    // 공란 에러 메시지
    useEffect(() => {
        if (showEmptyError) showToast(messageCategories.emptyDateAndMachine[lang], "error");
        const errorTimer = setTimeout(() => setShowEmptyError(false), 6000);
        return () => clearTimeout(errorTimer);
    }, [showEmptyError]);

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
            if (response?.data) {
                setTimeout(() => {
                    navigate("/reservation/done", {replace:true});
                }, 300);
            }
        } catch (err) {
            console.error("3D 프린터 예약 중 에러 발생: ", err);
        }
    }, [sendRequest, reservation]);

    return (
        <>
            <Container>
                <HeadTag title={headerCategories.printerReservationHeader[lang]}/>

                <Header>
                    <Grid align={"center"} columns={3} style={{width: "100%"}}>
                        <Header.Left>
                            <ArrowBack/>
                        </Header.Left>
                        <Header.Center>
                            <h2 css={headerCenter}>{headerCategories.printerReservationHeader[lang]}</h2>
                        </Header.Center>
                        <Header.Right>
                            <MapModal
                                trigger={<Icon svg={mapIcon} isHovered={true}/>}
                                machine={"printer"}
                            />
                        </Header.Right>
                    </Grid>
                </Header>

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
                                    variant={"filled"}
                                    width={"full"}
                                    color={"approval"}
                                    size={"md"}
                                    onClick={() => setShowSelectModal(true)}
                                >
                                    {reservation ? `${buttonCategories.change[lang]}` : `${buttonCategories.selectDateAndMachine[lang]}`}
                                </Button>
                            </div>
                        </DateMachineSelectWrapper>

                        <Button
                            type={"submit"}
                            variant={"filled"}
                            width={"full"}
                            color={"primary"}
                            size={"lg"}
                        >
                            {buttonCategories.reservation[lang]}
                        </Button>
                    </form>
                }
            </Container>

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
        </>
    );
};

export default ReservationPrinter;