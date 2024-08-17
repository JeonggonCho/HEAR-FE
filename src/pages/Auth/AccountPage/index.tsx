import Header from "../../../components/Header";
import {FC} from "react";
import {Container, UserName} from "./style.ts";
import HollowBtn from "../../../components/HollowBtn";
import ProfileCard from "../../../components/ProfileCard";
import ColoredBtn from "../../../components/ColoredBtn";
import StatusCard from "../../../components/StatusCard";
import CountOfLaserCard from "../../../components/CountOfLaserCard";
import ReservationListCard from "../../../components/ReservationListCard";
import UsageListCard from "../../../components/UsageListCard";
import InquiryListCard from "../../../components/InquiryListCard";

const AccountHeaderLeft:FC = () => <h2><UserName>조정곤</UserName>님 안녕하세요</h2>;

const AccountHeaderRight:FC = () => {
    return (
        <HollowBtn
            type={"submit"}
            text={"로그아웃"}
            width={"fit"}
            color={"second"}
            btnSize={"small"}
        />
    )
};

const AccountPage = () => {
    return (
        <Container>
            <Header leftChild={<AccountHeaderLeft/>} rightChild={<AccountHeaderRight/>}/>
            <ProfileCard/>
            <div>
                <ColoredBtn type={"link"} text={"내정보 수정"} width={"full"} color={"second"} btnSize={"small"} to={"/account/update"}/>
                <ColoredBtn type={"link"} text={"비밀번호 변경"} width={"full"} color={"second"} btnSize={"small"} to={"/password/update"}/>
            </div>
            <StatusCard/>
            <CountOfLaserCard/>
            <ReservationListCard/>
            <InquiryListCard/>
            <UsageListCard/>
            <HollowBtn type={"submit"} text={"탈퇴하기"} width={"full"} color={"danger"} btnSize={"big"}/>
        </Container>
    );
};

export default AccountPage;