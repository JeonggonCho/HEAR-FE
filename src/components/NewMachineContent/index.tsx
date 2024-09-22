import {FC, useCallback} from "react";
import {ReactSVG} from "react-svg";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import Input from "@components/Input";
import Button from "@components/Button";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";

import {INewMachineContentProps} from "@/types/componentProps.ts";
import useRequest from "@hooks/useRequest.ts";
import {newMachineSchema} from "@schemata/machineSchema.ts";

import {Container} from "./style.ts";

import close from "@assets/icons/close.svg";

const NewMachineContent:FC<INewMachineContentProps> = ({title, setModal, machine, setMachines}) => {
    const {sendRequest, errorText, clearError} = useRequest();

    type MachineFormData = z.infer<typeof newMachineSchema>;

    // 기기 생성 useForm
    const {
        register: machineRegister,
        handleSubmit: machineHandleSubmit,
        formState:{errors: machineErrors},
    } = useForm<MachineFormData>({
        resolver: zodResolver(newMachineSchema),
        defaultValues: {
            name: "",
        },
    });

    // 레이저 커팅기 생성하기
    const submitLaserHandler:SubmitHandler<MachineFormData> = useCallback(async (data) => {
        try {
            const response = await sendRequest({
                url: "/machines/lasers",
                method: "post",
                data: data,
            });
            let {laser} = response.data;
            laser.url = `/machines/lasers/${laser._id}`;
            setMachines((prevState:any) => [...prevState, laser]);
        } catch (err) {
            console.error("레이저 커팅기 생성 중 에러: ", err);
        } finally {
            setModal(false);
        }
    }, [sendRequest]);

    // 3d 프린터 생성하기
    const submitPrinterHandler:SubmitHandler<MachineFormData> = useCallback(async (data) => {
        try {
            const response = await sendRequest({
                url: "/machines/printers",
                method: "post",
                data: data,
            });
            let {printer} = response.data;
            printer.url = `/machines/printers/${printer._id}`;
            setMachines((prevState:any) => [...prevState, printer]);
        } catch (err) {
            console.error("3d 프린터 생성 중 에러: ", err);
        } finally {
            setModal(false);
        }
    }, [sendRequest]);

    return (
        <Container>
            <div>
                <h3>{title}</h3>
                <div onClick={() => {setModal(false)}}>
                    <ReactSVG src={close}/>
                </div>
            </div>

            {(machine === "laser" || machine === "printer") &&
                <form onSubmit={machine === "laser" ? machineHandleSubmit(submitLaserHandler) : machine === "printer" ? machineHandleSubmit(submitPrinterHandler) : undefined}>
                    <Input
                        label={"기기명"}
                        type={"text"}
                        id={"laser-name"}
                        name={"name"}
                        placeholder={"기기명을 입력해주세요"}
                        register={machineRegister}
                        errorMessage={machineErrors.name?.message}
                    />

                    <Button
                        type={"submit"}
                        content={"생성하기"}
                        width={"full"}
                        color={"primary"}
                        scale={"big"}
                    />
                </form>
            }

            {errorText &&
              <Modal
                content={<ErrorContent text={errorText} closeModal={clearError}/>}
                setModal={clearError}
                type={"popup"}
              />
            }
        </Container>
    );
};

export default NewMachineContent;