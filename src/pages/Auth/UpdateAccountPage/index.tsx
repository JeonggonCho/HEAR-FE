import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import {Container} from "./style.ts";
import Select from "../../../components/Select";
import InputWithLabel from "../../../components/InputWithLabel";
import ColoredBtn from "../../../components/ColoredBtn";
import {useState} from "react";
import Modal from "../../../components/Modal";
import ConfirmModalContent from "../../../components/ConfirmModalContent";

const yearCategories = [
    {label: "1학년", name: "year-type", value: "1", id: "radio-1", onChange: () => {}, checked: true},
    {label: "2학년", name: "year-type", value: "2", id: "radio-2", onChange: () => {}, checked: false},
    {label: "3학년", name: "year-type", value: "3", id: "radio-3", onChange: () => {}, checked: false},
    {label: "4학년", name: "year-type", value: "4", id: "radio-4", onChange: () => {}, checked: false},
    {label: "5학년", name: "year-type", value: "5", id: "radio-5", onChange: () => {}, checked: false},
];

const UpdateAccountPage = () => {
    const [updateAccountModal, setUpdateAccountModal] = useState<boolean>(false);

    const UpdateAccountModalContent = () => {
        const leftBtn = (
            <ColoredBtn
                type={"button"}
                text={"닫기"}
                width={"full"}
                color={"third"}
                btnSize={"normal"}
                onClick={() => {setUpdateAccountModal(false)}}
            />
        );
        const rightBtn = (
            <ColoredBtn
                type={"submit"}
                text={"수정하기"}
                width={"full"}
                color={"approval"}
                btnSize={"normal"}
            />
        );
        return (
            <ConfirmModalContent text={"회원정보를 수정하시겠습니까?"} leftBtn={leftBtn} rightBtn={rightBtn}/>
        );
    };

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"내 정보 수정"}/>
            <form method={"post"} onSubmit={(e) => {
                e.preventDefault();
            }}>
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
                <ColoredBtn
                    type={"button"}
                    text={"내 정보 수정"}
                    width={"full"}
                    color={"primary"}
                    btnSize={"big"}
                    onClick={() => setUpdateAccountModal(true)}
                />

                {updateAccountModal &&
                    <Modal
                      content={<UpdateAccountModalContent/>}
                      setModal={setUpdateAccountModal}
                    />
                }
            </form>
        </Container>
    );
};

export default UpdateAccountPage;