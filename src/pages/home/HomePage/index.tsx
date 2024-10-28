import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ManagerCard from "@components/home/ManagerCard";
import NoticeCard from "@components/home/NoticeCard";
import Carousel from "@components/common/Carousel";
import FeedBackCard from "@components/home/FeedBackCard";
import ReservationCard from "@components/home/ReservationCard";
import CardLoading from "@components/skeleton/CardLoading";
import CafeSiteCard from "@components/home/CafeSiteCard";
import HeadTag from "@components/common/HeadTag";
import LaserReservationConditionContent from "@components/content/LaserReservationConditionContent";
import PrinterReservationConditionContent from "@components/content/PrinterReservationConditionContent";
import HeatReservationConditionContent from "@components/content/HeatReservationConditionContent";
import SawReservationConditionContent from "@components/content/SawReservationConditionContent";
import VacuumReservationConditionContent from "@components/content/VacuumReservationConditionContent";
import CncReservationConditionContent from "@components/content/CncReservationConditionContent";

import {useThemeStore} from "@store/useThemeStore.ts";
import {ILaserStatus} from "@/types/reservation.ts";
import useRequest from "@hooks/useRequest.ts";
import {getLaserReservationRate} from "@util/getReservationRate.ts";

import {
    AlarmWrapper,
    Container,
    HeaderElementWrapper,
    Logo,
    LogoWrapper,
    Title
} from "./style.ts";

import logo from "@assets/logo.svg";
import alarm from "@assets/icons/alarm.svg";
import {useToastStore} from "@store/useToastStore.ts";


const HomeHeaderLeft:FC = () => {
    return (
        <HeaderElementWrapper>
            <LogoWrapper>
                <Logo src={logo}/>
            </LogoWrapper>
            <Title>HEAR</Title>
        </HeaderElementWrapper>
    );
};


const HomeHeaderRight:FC = () => {
    const {isDarkMode} = useThemeStore();

    return (
        <AlarmWrapper to={"/alarm"} darkmode={isDarkMode.toString()}>
            <ReactSVG src={alarm}/>
        </AlarmWrapper>
    );
};


const HomePage = () => {
    const [machineStatus, setMachineStatus] = useState({laser: false, printer: false, heat: false, saw: false, vacuum: false, cnc: false});
    const [laserStatus, setLaserStatus] = useState<ILaserStatus[]>([]);
    const [printerStatus, setPrinterStatus] = useState([]);
    const [heatStatus, setHeatStatus] = useState([]);
    const [sawStatus, setSawStatus] = useState([]);
    const [vacuumStatus, setVacuumStatus] = useState([]);
    const [cncStatus, setCncStatus] = useState([]);

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
        <Container>
            <HeadTag title={"HEAR"}/>

            <Header
                leftChild={<HomeHeaderLeft/>}
                rightChild={<HomeHeaderRight/>}
                type={"flex"}
            />

            <div>
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
                <ManagerCard/>
                <div>
                    <CafeSiteCard/>
                    <FeedBackCard/>
                </div>
            </div>
        </Container>
    );
};

export default HomePage;