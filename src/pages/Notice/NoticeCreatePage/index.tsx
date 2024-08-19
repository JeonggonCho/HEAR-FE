import {Container} from "./style.ts";
import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import InputWithLabel from "@components/InputWithLabel";
import Textarea from "@components/Textarea";
import ColoredBtn from "@components/ColoredBtn";

const NoticeCreatePage = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"공지사항 작성하기"}/>
            <form method={"post"} onSubmit={(e) => {
                e.preventDefault();
            }}>
                <InputWithLabel
                    label={"제목"}
                    type={"text"}
                    id={"notice-title"}
                    name={"notice-title"}
                    placeholder={"공지사항 제목을 입력해주세요"}
                    value={""}
                />
                <Textarea/>
                <ColoredBtn type={"submit"} text={"공지하기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </Container>
    );
};

export default NoticeCreatePage;