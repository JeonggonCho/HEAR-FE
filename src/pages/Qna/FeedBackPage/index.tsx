import {Container, HeaderWrapper} from "./style.ts";
import Header from "../../../components/Header";
import HollowBtn from "../../../components/HollowBtn";
import qna from "../../../assets/images/qna.png";
import {IInquiryListItemProps} from "@/types/componentProps.ts";
import InquiryListItem from "@components/InquiryListItem";
import CreateBtn from "@components/CreateBtn";
import Empty from "@components/Empty";

const dummy:IInquiryListItemProps[] = [
    // {
    //     id: 1,
    //     title: "기기에 문제가 있어요!!",
    //     author: "조정곤",
    //     date: "2024.07.30",
    //     category: "machine",
    //     answer: false,
    // },
    // {
    //     id: 2,
    //     title: "레이저 고장났어요!!",
    //     author: "조정곤",
    //     date: "2024.07.30",
    //     category: "room",
    //     answer: true,
    // },
    // {
    //     id: 3,
    //     title: "톱 사용 가능한가요?",
    //     author: "조정곤",
    //     date: "2024.07.30",
    //     category: "machine",
    //     answer: false,
    // },
    // {
    //     id: 4,
    //     title: "cnc 사용 가능할까요?",
    //     author: "조정곤",
    //     date: "2024.07.30",
    //     category: "etc",
    //     answer: false,
    // },
    // {
    //     id: 5,
    //     title: "기기가 안되요 ㅠㅜㅠ",
    //     author: "조정곤",
    //     date: "2024.07.30",
    //     category: "machine",
    //     answer: true,
    // },
    // {
    //     id: 6,
    //     title: "3d 프린터 안되요",
    //     author: "조정곤",
    //     date: "2024.07.30",
    //     category: "reservation",
    //     answer: false,
    // },
    // {
    //     id: 7,
    //     title: "기기에 문제가 있어요!!",
    //     author: "조정곤",
    //     date: "2024.07.30",
    //     category: "room",
    //     answer: false,
    // },
];

const FeedbackHeaderLeft = () => (
    <HeaderWrapper>
        <img src={qna} alt="피드백"/>
        <h2>피드백</h2>
    </HeaderWrapper>
);

const FeedbackHeaderRight = () => (
    <HollowBtn type={"link"} text={"모형제작실 문의"} width={"fit"} color={"primary"} btnSize={"small"} to={"/inquiry"}/>
);

const FeedbackPage = () => {
    return (
        <Container>
            <Header leftChild={<FeedbackHeaderLeft/>} rightChild={<FeedbackHeaderRight/>}/>
            <p>
                피드백은 애플리케이션 개발자에게 전달되며,<br/>
                해당 앱 업데이트에 도움이 됩니다
            </p>

            {dummy.length !== 0 ? dummy.map((value, idx) => (
                <InquiryListItem key={idx} {...value}/>
            ))
                :
                <Empty
                    title={"작성된 피드백이 아직 없어요"}
                    message={"서비스에 대한 여러분의 피드백을 남겨주세요"}
                />
            }

            <CreateBtn to={"/feedback/new"}/>
        </Container>
    );
};

export default FeedbackPage;