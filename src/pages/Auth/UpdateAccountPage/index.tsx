import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import {Container} from "./style.ts";
import Select from "@components/Select";
import InputWithLabel from "@components/InputWithLabel";
import ColoredBtn from "@components/ColoredBtn";
import {useState} from "react";
import Modal from "@components/Modal";
import ConfirmContent from "@components/ConfirmContent";
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

    const UpdateAccountContent = () => {
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
            <ConfirmContent
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
                    label={"스튜디오"}
                    type={"text"}
                    id={"studio"}
                    name={"studio"}
                    placeholder={"스튜디오 교수님 이름을 입력해주세요"}
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
                content={<UpdateAccountContent/>}
                setModal={setUpdateAccountModal}
                type={"popup"}
              />
            }
        </Container>
    );
};

export default UpdateAccountPage;