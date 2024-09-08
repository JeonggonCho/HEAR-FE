import {FC, useState} from "react";
import {ReactSVG} from "react-svg";

import Header from "@components/Header";
import ManagerCard from "@components/ManagerCard";
import NoticeCard from "@components/NoticeCard";
import SituationCard from "@components/ConditionCard";
import LangSettingCard from "@components/LangSettingCard";
import FeedBackCard from "@components/FeedBackCard";
import Modal from "@components/Modal";
import LangSettingContent from "@components/LangSettingContent";

import {useThemeStore} from "@store/useThemeStore.ts";

import {AlarmWrapper, Container, HeaderElementWrapper, Logo, LogoWrapper, ThemeWrapper, Title} from "./style.ts";

import logo from "@assets/logo.svg";
import alarm from "@assets/icons/alarm.svg";
import dark from "@assets/icons/dark.svg";
import light from "@assets/icons/light.svg";

const MainHeaderLeft: FC = () => {
    return (
        <HeaderElementWrapper>
            <LogoWrapper>
                <Logo src={logo}/>
            </LogoWrapper>
            <Title>HEAR</Title>
        </HeaderElementWrapper>
    );
};

const MainHeaderRight:FC = () => {
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

const MainPage = () => {
    const [langModal, setLangModal] = useState<boolean>(false);

    return (
        <Container>
            <Header leftChild={<MainHeaderLeft/>} rightChild={<MainHeaderRight/>}/>
            <p>
                한양대학교 에리카 건축학부<br/>
                모형제작실 사용 및 예약 애플리케이션
            </p>
            <ManagerCard/>
            <NoticeCard/>
            <SituationCard/>
            <div>
                <LangSettingCard setModal={setLangModal}/>
                <FeedBackCard/>
            </div>

            {langModal &&
              <Modal
                title={"언어설정"}
                setModal={setLangModal}
                content={<LangSettingContent setModal={setLangModal}/>}
                type={"bottomSheet"}
              />
            }
        </Container>
    );
};

export default MainPage;