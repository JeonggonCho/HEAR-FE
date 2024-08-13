import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import {Container} from "./style.ts";
import ColoredBtn from "../../../components/ColoredBtn";

const InquiryPage = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"문의하기"}/>
            <p>
                모형제작실과 관련된 문제점, 궁금한 점 등<br/>
                문의사항을 보내주세요
            </p>

            <form method={"post"} onSubmit={() => {}}>
                <ColoredBtn type={"submit"} text={"문의 보내기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </Container>
    );
};

export default InquiryPage;