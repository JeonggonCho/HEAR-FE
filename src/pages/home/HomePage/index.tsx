import {FC, useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ManagerCard from "@components/home/ManagerCard";
import NoticeCard from "@components/home/NoticeCard";
import Carousel from "@components/common/Carousel";
import LangSettingCard from "@components/home/LangSettingCard";
import FeedBackCard from "@components/home/FeedBackCard";
import Modal from "@components/common/Modal";
import LangSettingContent from "@components/content/LangSettingContent";
import ReservationCard from "@components/home/ReservationCard";
import CardLoading from "@components/skeleton/CardLoading";
import ErrorContent from "@components/content/ErrorContent";
import CafeSiteCard from "@components/home/CafeSiteCard";

import LaserReservationConditionContent from "@components/content/LaserReservationConditionContent";
import PrinterReservationConditionContent from "@components/content/PrinterReservationConditionContent";
import HeatReservationConditionContent from "@components/content/HeatReservationConditionContent";
import SawReservationConditionContent from "@components/content/SawReservationConditionContent";
import VacuumReservationConditionContent from "@components/content/VacuumReservationConditionContent";
import CncReservationConditionContent from "@components/content/CncReservationConditionContent";

import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import useRequest from "@hooks/useRequest.ts";

import {AlarmWrapper, Container, HeaderElementWrapper, Logo, LogoWrapper, ThemeWrapper, Title} from "./style.ts";

import logo from "@assets/logo.svg";
import alarm from "@assets/icons/alarm.svg";
import dark from "@assets/icons/dark.svg";
import light from "@assets/icons/light.svg";


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
    const {isDarkMode, setTheme} = useThemeStore();

    return (
        <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
            <ThemeWrapper onClick={() => setTheme(isDarkMode)}>
                <ReactSVG src={isDarkMode ? light : dark}/>
            </ThemeWrapper>

            <AlarmWrapper to={"/alarm"}>
                <ReactSVG src={alarm}/>
            </AlarmWrapper>
        </div>
    );
};

const HomePage = () => {
    const [langModal, setLangModal] = useState<boolean>(false);

    const {lang} = useThemeStore();

    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    const fetchAllReservations = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/reservations/all",
            });
            console.log(response.data);
        } catch (err) {
            console.error("예약 현황 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchAllReservations();
    }, [fetchAllReservations]);

    return (
        <Container>
            <Header leftChild={<HomeHeaderLeft/>} rightChild={<HomeHeaderRight/>}/>

            {isLoading ?
                <CardLoading heightValue={"278px"}/>
                :
                <Carousel contents={
                    [
                        <LaserReservationConditionContent/>,
                        <PrinterReservationConditionContent/>,
                        <HeatReservationConditionContent/>,
                        <SawReservationConditionContent/>,
                        <VacuumReservationConditionContent/>,
                        <CncReservationConditionContent/>,
                    ]
                }/>
            }

            <ReservationCard/>
            <NoticeCard/>
            <div>
                <ManagerCard/>
                <CafeSiteCard/>
            </div>
            <div>
                <LangSettingCard setModal={setLangModal}/>
                <FeedBackCard/>
            </div>

            {langModal &&
              <Modal
                title={buttonCategories.languageSetting[lang]}
                setModal={setLangModal}
                content={<LangSettingContent setModal={setLangModal}/>}
                type={"bottomSheet"}
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

export default HomePage;