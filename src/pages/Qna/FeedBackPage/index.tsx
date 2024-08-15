import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import Textarea from "../../../components/Textarea";
import ColoredBtn from "../../../components/ColoredBtn";
import {Container} from "./style.ts";
import Select from "../../../components/Select";
import InputWithLabel from "../../../components/InputWithLabel";

const feedBackCategories = [
    {label: "좋은점", name: "feedback-type", value: "good", id: "radio-1", onChange: () => {}, checked: false},
    {label: "문제점", name: "feedback-type", value: "bad", id: "radio-2", onChange: () => {}, checked: false},
    {label: "제안", name: "feedback-type", value: "suggest", id: "radio-3", onChange: () => {}, checked: true},
    {label: "기타", name: "feedback-type", value: "etc", id: "radio-4", onChange: () => {}, checked: false},
];

const FeedBackPage = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"어플리케이션 피드백"}/>
            <p>
                어플리케이션의 좋은점, 개선점 등<br/>
                여러분의 피드백을 보내주세요
            </p>
            
            <form method={"post"} onSubmit={() => {}}>
                <InputWithLabel label={"제 목"} type={"text"} id={"inquiry-title"} name={"inquiry-title"} placeholder={"제목을 입력해주세요"} value={""}/>
                <Select categories={feedBackCategories}/>
                <Textarea/>
                <ColoredBtn type={"submit"} text={"피드백 보내기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </Container>
    );
};

export default FeedBackPage;