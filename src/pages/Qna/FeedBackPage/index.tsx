import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import Textarea from "../../../components/Textarea";
import ColoredBtn from "../../../components/ColoredBtn";
import {Container} from "./style.ts";
import Select from "../../../components/Select";

const FeedBackPage = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"어플리케이션 피드백"}/>
            <p>
                어플리케이션의 좋은점, 개선점 등<br/>
                여러분의 피드백을 보내주세요
            </p>
            
            <form method={"post"} onSubmit={() => {}}>
                <Select id={"feedback-category"} name={"feedback-category"}/>
                <Textarea/>
                <ColoredBtn type={"submit"} text={"피드백 보내기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </Container>
    );
};

export default FeedBackPage;