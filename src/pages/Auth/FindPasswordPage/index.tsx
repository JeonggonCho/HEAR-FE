import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import InputWithLabel from "../../../components/InputWithLabel";
import ColoredBtn from "../../../components/ColoredBtn";

const FindPasswordPage = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"비밀번호 찾기"}/>
            <form method={"post"} onSubmit={() => {}}>
                <InputWithLabel
                    label={"이 름"}
                    type={"text"}
                    placeholder={"이름을 입력해주세요"}
                    value={""}
                    name={"username"}
                    id={"username"}
                    onChange={() => {}}
                />
                <InputWithLabel
                    label={"한양대학교 이메일 (아이디)"}
                    type={"text"}
                    placeholder={"이메일을 입력해주세요"}
                    value={""}
                    name={"email"}
                    id={"email"}
                    onChange={() => {}}
                />
                <InputWithLabel
                    label={"학 번"}
                    type={"number"}
                    placeholder={"학번을 입력해주세요"}
                    value={""}
                    name={"student-id"}
                    id={"student-id"}
                    onChange={() => {}}
                />
                <ColoredBtn type={"submit"} text={"비밀번호 찾기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </div>
    );
};

export default FindPasswordPage;