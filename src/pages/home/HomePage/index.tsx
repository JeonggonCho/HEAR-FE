import {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import AssistantCard from "@components/home/AssistantCard";
import NoticeCard from "@components/home/NoticeCard";
import Carousel from "@components/common/Carousel";
import FeedbackCard from "@components/home/FeedbackCard";
import ReservationCard from "@components/home/ReservationCard";
import CardLoading from "@components/skeleton/CardLoading";
import CafeSiteCard from "@components/home/CafeSiteCard";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import Flex from "@components/common/Flex";
import LaserReservationConditionContent from "@components/home/LaserReservationConditionContent";
import PrinterReservationConditionContent from "@components/home/PrinterReservationConditionContent";
import HeatReservationConditionContent from "@components/home/HeatReservationConditionContent";
import SawReservationConditionContent from "@components/home/SawReservationConditionContent";
import VacuumReservationConditionContent from "@components/home/VacuumReservationConditionContent";
import CncReservationConditionContent from "@components/home/CncReservationConditionContent";
import HomeHeader from "@components/home/HomeHeader";
import useRequest from "@hooks/useRequest.ts";
import {getLaserReservationRate} from "@util/getReservationRate.ts";
import {ILaserStatus} from "@/types/reservation.ts";
import {useToastStore} from "@store/useToastStore.ts";


const HomePage = () => {
    const [machineStatus, setMachineStatus] = useState({laser: false, printer: false, heat: false, saw: false, vacuum: false, cnc: false});
    const [laserStatus, setLaserStatus] = useState<ILaserStatus[]>([]);
    const [printerStatus, setPrinterStatus] = useState([]);
    const [heatStatus, setHeatStatus] = useState([]);
    const [sawStatus, setSawStatus] = useState([]);
    const [vacuumStatus, setVacuumStatus] = useState([]);
    const [cncStatus, setCncStatus] = useState([]);

    const navigate = useNavigate();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    const {rate, color} = useMemo(() =>  getLaserReservationRate(laserStatus), [laserStatus]);

    const fetchAllReservations = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/reservations/all",
            });
            if (response.data) {
                setLaserStatus(response.data.laserStatus);
                setPrinterStatus(response.data.printerStatus);
                setHeatStatus(response.data.heatStatus);
                setSawStatus(response.data.sawStatus);
                setVacuumStatus(response.data.vacuumStatus);
                setCncStatus(response.data.cncStatus);
            }
        } catch (err) {
            console.error("예약 현황 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);


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
        fetchAllReservations();
    }, [fetchAllReservations, fetchMachineStatus]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    const carouselContents = [];
    if (machineStatus.laser) carouselContents.push(<LaserReservationConditionContent laserStatus={laserStatus} rate={rate} color={color || "primary"}/>);
    if (machineStatus.printer) carouselContents.push(<PrinterReservationConditionContent/>);
    if (machineStatus.heat) carouselContents.push(<HeatReservationConditionContent/>);
    if (machineStatus.saw) carouselContents.push(<SawReservationConditionContent/>);
    if (machineStatus.vacuum) carouselContents.push(<VacuumReservationConditionContent/>);
    if (machineStatus.cnc) carouselContents.push(<CncReservationConditionContent/>);


    return (
        <>
            <HeadTag title={"HEAR"}/>
            <HomeHeader/>
            <Flex direction={"column"} gap={16} style={{margin: "0 24px"}}>
                {isLoading ?
                    <CardLoading heightValue={"300px"}/>
                    :
                    (machineStatus.laser || machineStatus.printer || machineStatus.heat || machineStatus.saw || machineStatus.vacuum || machineStatus.cnc) ?
                        <Carousel contents={carouselContents}/>
                        : null
                }
                <ReservationCard
                    laser={machineStatus.laser}
                    printer={machineStatus.printer}
                    heat={machineStatus.heat}
                    saw={machineStatus.saw}
                    vacuum={machineStatus.vacuum}
                    cnc={machineStatus.cnc}
                    isLoading={isLoading}
                />
                <NoticeCard/>
                <AssistantCard/>

                <Grid align={"center"} columns={2} gap={16}>
                    <CafeSiteCard/>
                    <FeedbackCard/>
                </Grid>
            </Flex>
        </>
    );
};

export default HomePage;