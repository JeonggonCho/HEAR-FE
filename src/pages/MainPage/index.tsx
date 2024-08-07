import Header from "../../components/Header";
import {HeaderElementWrapper, Logo, LogoWrapper, Title} from "./style.ts";
import logo from "../../assets/logo.svg";
import {FC} from "react";

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

const MainPage = () => {
    return (
        <div>
            <Header leftChild={<MainHeaderLeft/>}/>
            홈
        </div>
    );
};

export default MainPage;