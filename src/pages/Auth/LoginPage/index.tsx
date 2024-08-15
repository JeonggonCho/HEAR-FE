import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import ColoredBtn from "../../../components/ColoredBtn";
import InputWithLabel from "../../../components/InputWithLabel";
import Link from "../../../components/Link";
import {Container} from "./style.ts";

const LoginPage = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"로그인"}/>
            <form method={"post"}>
                <InputWithLabel
                    label={"한양대학교 이메일"}
                    type={"text"}
                    placeholder={"이메일을 입력해주세요"}
                    value={""}
                    id={"email"}
                    name={"email"}
                    onChange={() => {}}
                />
                <InputWithLabel
                    label={"비밀번호"}
                    type={"password"}
                    placeholder={"비밀번호를 입력해주세요"}
                    value={""}
                    id={"password"}
                    name={"password"}
                    onChange={() => {}}
                />
                <ColoredBtn
                    type={"submit"}
                    text={"로그인"}
                    width={"full"}
                    color={"primary"}
                    btnSize={"big"}
                />
            </form>
            <Link text={"비밀번호 찾기"} to={"/password-reset"} color={"second"}/>
            <Link text={"회원가입"} to={"/signup"} color={"primary"}/>
        </Container>
    );
};

export default LoginPage;