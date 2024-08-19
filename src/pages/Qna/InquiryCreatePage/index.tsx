import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import {Container} from "./style.ts";
import ColoredBtn from "../../../components/ColoredBtn";
import Textarea from "../../../components/Textarea";
import Select from "../../../components/Select";
import InputWithLabel from "../../../components/InputWithLabel";
import {inquiryCategories} from "@constants/inquiryCategories.ts";

const InquiryCreatePage = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"문의하기"}/>
            <p>
                모형제작실과 관련된 문제점, 궁금한 점 등<br/>
                문의사항을 보내주세요
            </p>

            <form method={"post"} onSubmit={(e) => {
                e.preventDefault();
            }}>
                <InputWithLabel label={"제 목"} type={"text"} id={"inquiry-title"} name={"inquiry-title"} placeholder={"제목을 입력해주세요"} value={""}/>
                <Select categories={inquiryCategories}/>
                <Textarea/>
                <ColoredBtn type={"submit"} text={"문의하기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </Container>
    );
};

export default InquiryCreatePage;