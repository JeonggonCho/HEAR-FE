import Header from "../../../components/Header";
import {AlarmWrapper, Container, HeaderElementWrapper, Logo, LogoWrapper, Title} from "./style.ts";
import logo from "../../../assets/logo.svg";
import {FC} from "react";
import ManagerCard from "../../../components/ManagerCard";
import NoticeCard from "../../../components/NoticeCard";
import SituationCard from "../../../components/SituationCard";
import LangSettingCard from "../../../components/LangSettingCard";
import FeedBackCard from "../../../components/FeedBackCard";
import {ReactSVG} from "react-svg";
import alarm from "../../../assets/icons/alarm.svg";

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

const MainHeaderRight:FC = () => (
    <AlarmWrapper>
        <ReactSVG src={alarm}/>
    </AlarmWrapper>
);

const MainPage = () => {
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
                <LangSettingCard/>
                <FeedBackCard/>
            </div>
        </Container>
    );
};

export default MainPage;