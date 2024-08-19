import {Container} from "./style.ts";
import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";

const dummy = {
    title: "기기가 고장 났어요",
    author: "조정곤",
    date: "2024.08.18",
    category: "machine",
    content: "갑자기 작동하다가 전원이 안켜져요 ㅠㅜㅠㅜㅠ",
};

const InquiryDetailPage = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"문의"}/>
            <span>{dummy.category}</span>
            <h2>{dummy.title}</h2>
            <p>{dummy.date}</p>
            <p>{dummy.author}</p>
            <p>{dummy.content}</p>
        </Container>
    );
};

export default InquiryDetailPage;