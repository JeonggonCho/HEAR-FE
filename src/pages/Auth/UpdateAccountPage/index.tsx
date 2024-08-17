import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import {Container} from "./style.ts";
import Select from "../../../components/Select";
import InputWithLabel from "../../../components/InputWithLabel";
import ColoredBtn from "../../../components/ColoredBtn";

const yearCategories = [
    {label: "1학년", name: "year-type", value: "1", id: "radio-1", onChange: () => {}, checked: true},
    {label: "2학년", name: "year-type", value: "2", id: "radio-2", onChange: () => {}, checked: false},
    {label: "3학년", name: "year-type", value: "3", id: "radio-3", onChange: () => {}, checked: false},
    {label: "4학년", name: "year-type", value: "4", id: "radio-4", onChange: () => {}, checked: false},
    {label: "5학년", name: "year-type", value: "5", id: "radio-5", onChange: () => {}, checked: false},
];

const UpdateAccountPage = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"내 정보 수정"}/>
            <form method={"post"} onSubmit={() => {}}>
                <Select categories={yearCategories} label={"학 년"}/>
                <InputWithLabel
                    label={"스튜디오 지도 교수님"}
                    type={"text"}
                    id={"studio"}
                    name={"studio"}
                    placeholder={"지도 교수님 이름을 입력해주세요"}
                    value={""}
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
                <ColoredBtn type={"submit"} text={"내 정보 수정"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </Container>
    );
};

export default UpdateAccountPage;