import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import {Container} from "./style.ts";
import Select from "@components/Select";
import InputWithLabel from "@components/InputWithLabel";
import ColoredBtn from "@components/ColoredBtn";
import {useState} from "react";
import Modal from "@components/Modal";
import ConfirmModalContent from "@components/ConfirmModalContent";
import {yearCategories} from "@constants/yearCategories.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateAccountSchema} from "@schemata/updateAccountSchema.ts";

const UpdateAccountPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(updateAccountSchema),
        defaultValues: {
            year: "",
            studio: "",
            tel: "",
        }
    });

    const [updateAccountModal, setUpdateAccountModal] = useState<boolean>(false);

    const UpdateAccountModalContent = () => {
        const leftBtn = (
            <ColoredBtn
                type={"button"}
                content={"닫기"}
                width={"full"}
                color={"third"}
                scale={"normal"}
                onClick={() => {setUpdateAccountModal(false)}}
            />
        );
        const rightBtn = (
            <ColoredBtn
                type={"submit"}
                content={"수정하기"}
                width={"full"}
                color={"approval"}
                scale={"normal"}
            />
        );
        return (
            <ConfirmModalContent
                text={"회원정보를 수정하시겠습니까?"}
                leftBtn={leftBtn}
                rightBtn={rightBtn}
            />
        );
    };

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"내 정보 수정"}/>
            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
                setUpdateAccountModal(true);
            })}>
                <Select
                    categories={yearCategories}
                    label={"학 년"}
                    name={"year"}
                    register={register}
                    errorMessage={errors.year?.message}
                />

                <InputWithLabel
                    label={"스튜디오 지도 교수님"}
                    type={"text"}
                    id={"studio"}
                    name={"studio"}
                    placeholder={"지도 교수님 이름을 입력해주세요"}
                    register={register}
                    errorMessage={errors.studio?.message}
                />

                <InputWithLabel
                    label={"전화번호"}
                    type={"tel"}
                    placeholder={"전화번호를 입력해주세요"}
                    id={"tel"}
                    name={"tel"}
                    register={register}
                    errorMessage={errors.tel?.message}
                />

                <ColoredBtn
                    type={"submit"}
                    content={"내 정보 수정"}
                    width={"full"}
                    color={"primary"}
                    scale={"big"}
                />
            </form>

            {updateAccountModal &&
              <Modal
                content={<UpdateAccountModalContent/>}
                setModal={setUpdateAccountModal}
              />
            }
        </Container>
    );
};

export default UpdateAccountPage;