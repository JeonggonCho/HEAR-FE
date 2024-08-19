import Header from "@components/Header";
import qna from "@assets/images/qna.png";
import {Container, HeaderWrapper} from "./style.ts";
import HollowBtn from "@components/HollowBtn";
import InquiryListItem from "@components/InquiryListItem";
import {IInquiryListItemProps} from "@/types/componentProps.ts";
import CreateBtn from "@components/CreateBtn";
import Empty from "@components/Empty";

const dummy:IInquiryListItemProps[] = [
    {
        id: 1,
        title: "기기에 문제가 있어요!!",
        author: "조정곤",
        date: "2024.07.30",
        category: "machine",
        answer: false,
    },
    {
        id: 2,
        title: "레이저 고장났어요!!",
        author: "조정곤",
        date: "2024.07.30",
        category: "room",
        answer: true,
    },
    {
        id: 3,
        title: "톱 사용 가능한가요?",
        author: "조정곤",
        date: "2024.07.30",
        category: "machine",
        answer: false,
    },
    {
        id: 4,
        title: "cnc 사용 가능할까요?",
        author: "조정곤",
        date: "2024.07.30",
        category: "etc",
        answer: false,
    },
    {
        id: 5,
        title: "기기가 안되요 ㅠㅜㅠ",
        author: "조정곤",
        date: "2024.07.30",
        category: "machine",
        answer: true,
    },
    {
        id: 6,
        title: "3d 프린터 안되요",
        author: "조정곤",
        date: "2024.07.30",
        category: "reservation",
        answer: false,
    },
    {
        id: 7,
        title: "기기에 문제가 있어요!!",
        author: "조정곤",
        date: "2024.07.30",
        category: "room",
        answer: false,
    },
];

const InquiryHeaderLeft = () => (
    <HeaderWrapper>
        <img src={qna} alt="모형제작실 문의"/>
        <h2>모형제작실 문의</h2>
    </HeaderWrapper>
);

const InquiryHeaderRight = () => (
    <HollowBtn type={"link"} text={"피드백"} width={"fit"} color={"primary"} scale={"small"} to={"/feedback"}/>
);

const InquiryPage = () => {
    return (
        <Container>
            <Header leftChild={<InquiryHeaderLeft/>} rightChild={<InquiryHeaderRight/>}/>
            <p>
                문의사항은 모형제작실 조교에게 전달되며,<br/>
                답변을 받는 데 시간이 소요될 수 있습니다
            </p>

            {dummy.length !== 0 ? dummy.map((value, idx) => (
                <InquiryListItem key={idx} {...value}/>
            ))
                :
                <Empty
                    title={"작성된 문의가 아직 없어요"}
                    message={"모형제작실에 관해서 궁금한 점이 있으시면 언제든 물어보세요"}
                />
            }

            <CreateBtn to={"/inquiry/new"}/>
        </Container>
    );
};

export default InquiryPage;