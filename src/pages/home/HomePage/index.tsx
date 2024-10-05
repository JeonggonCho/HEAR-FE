import {FC, useState} from "react";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ManagerCard from "@components/home/ManagerCard";
import NoticeCard from "@components/home/NoticeCard";
import ReservationConditionCard from "@components/home/ReservationConditionCard";
import LangSettingCard from "@components/home/LangSettingCard";
import FeedBackCard from "@components/home/FeedBackCard";
import Modal from "@components/common/Modal";
import LangSettingContent from "@components/content/LangSettingContent";
import ReservationCard from "@components/home/ReservationCard";

import {useThemeStore} from "@store/useThemeStore.ts";

import {AlarmWrapper, Container, HeaderElementWrapper, Logo, LogoWrapper, ThemeWrapper, Title} from "./style.ts";

import logo from "@assets/logo.svg";
import alarm from "@assets/icons/alarm.svg";
import dark from "@assets/icons/dark.svg";
import light from "@assets/icons/light.svg";
import {buttonCategories} from "@constants/buttonCategories.ts";

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

    return (
        <Container>
            <Header leftChild={<HomeHeaderLeft/>} rightChild={<HomeHeaderRight/>}/>
            <ReservationConditionCard/>
            <ReservationCard/>
            <NoticeCard/>
            <ManagerCard/>
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
        </Container>
    );
};

export default HomePage;