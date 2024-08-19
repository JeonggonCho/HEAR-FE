import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import ColoredBtn from "../../../components/ColoredBtn";
import InputWithLabel from "../../../components/InputWithLabel";
import Link from "../../../components/Link";
import {Container} from "./style.ts";
import Select from "../../../components/Select";
import {yearCategories} from "@constants/yearCategories.ts";

const SignupPage = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"회원가입"}/>
            <form method={"post"} onSubmit={(e) => {
                e.preventDefault();
            }}>
                <InputWithLabel
                    label={"이름"}
                    type={"text"}
                    placeholder={"이름을 입력해주세요"}
                    value={""}
                    id={"username"}
                    name={"username"}
                    onChange={() => {}}
                />
                <InputWithLabel
                    label={"한양대학교 이메일 (아이디)"}
                    type={"text"}
                    placeholder={"이메일을 입력해주세요"}
                    value={""}
                    id={"email"}
                    name={"email"}
                    onChange={() => {}}
                />
                <InputWithLabel
                    label={"인증번호"}
                    type={"text"}
                    placeholder={"이메일의 인증번호를 입력해주세요"}
                    value={""}
                    id={"certification-number"}
                    name={"certification-number"}
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
                <InputWithLabel
                    label={"비밀번호 확인"}
                    type={"password"}
                    placeholder={"비밀번호를 한번 더 입력해주세요"}
                    value={""}
                    id={"confirm-password"}
                    name={"confirm-password"}
                    onChange={() => {}}
                />
                <Select label={"학 년"} categories={yearCategories}/>
                <InputWithLabel
                    label={"학 번"}
                    type={"number"}
                    placeholder={"학번을 입력해주세요"}
                    value={""}
                    id={"student-id"}
                    name={"student-id"}
                    onChange={() => {}}
                />
                <InputWithLabel
                    label={"스튜디오 지도 교수님"}
                    type={"text"}
                    placeholder={"지도 교수님 이름을 입력해주세요"}
                    value={""}
                    id={"studio"}
                    name={"studio"}
                    onChange={() => {}}
                />
                <InputWithLabel
                    label={"전화번호"}
                    type={"tel"}
                    placeholder={"전화번호를 입력해주세요"}
                    value={""}
                    id={"tel"}
                    name={"tel"}
                    onChange={() => {}}
                />
                <ColoredBtn type={"submit"} text={"회원가입"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
            <Link text={"로그인"} to={"/login"} color={"primary"}/>
        </Container>
    );
};

export default SignupPage;