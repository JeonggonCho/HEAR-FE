import {FC, useCallback} from "react";
import {ReactSVG} from "react-svg";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import InputWithLabel from "@components/InputWithLabel";
import ColoredBtn from "@components/ColoredBtn";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";

import {INewMachineContentProps} from "@/types/componentProps.ts";
import useRequest from "@hooks/useRequest.ts";
import {newLaserSchema, newPrinterSchema} from "@schemata/machineSchema.ts";

import {Container} from "./style.ts";

import close from "@assets/icons/close.svg";

const NewMachineContent:FC<INewMachineContentProps> = ({title, setModal, machine, setMachines}) => {
    const {sendRequest, errorText, clearError} = useRequest();

    type LaserFormData = z.infer<typeof newLaserSchema>;
    type PrinterFormData = z.infer<typeof newPrinterSchema>;

    const {
        register: laserRegister,
        handleSubmit: laserHandleSubmit,
        formState:{errors: laserErrors}
    } = useForm<LaserFormData>({
        resolver: zodResolver(newLaserSchema),
        defaultValues: {
            name: "",
        },
    });

    const {
        register: printerRegister,
        handleSubmit: printerHandleSubmit,
        formState:{errors: printerErrors}
    } = useForm<PrinterFormData>({
        resolver: zodResolver(newPrinterSchema),
        defaultValues: {
            name: "",
        },
    });

    const submitLaserHandler:SubmitHandler<LaserFormData> = useCallback(async (data) => {
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

    const submitPrinterHandler:SubmitHandler<PrinterFormData> = useCallback(async (data) => {
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

            {machine === "laser" ?
                <form onSubmit={laserHandleSubmit(submitLaserHandler)}>
                    <InputWithLabel
                        label={"기기명"}
                        type={"text"}
                        id={"laser-name"}
                        name={"name"}
                        placeholder={"기기명을 입력해주세요"}
                        register={laserRegister}
                        errorMessage={laserErrors.name?.message}
                    />
                    <ColoredBtn
                        type={"submit"}
                        content={"생성하기"}
                        width={"full"}
                        color={"primary"}
                        scale={"normal"}
                    />
                </form>
                : machine === "printer" ?
                    <form onSubmit={printerHandleSubmit(submitPrinterHandler)}>
                        <InputWithLabel
                            label={"기기명"}
                            type={"text"}
                            id={"printer-name"}
                            name={"name"}
                            placeholder={"기기명을 입력해주세요"}
                            register={printerRegister}
                            errorMessage={printerErrors.name?.message}
                        />
                        <ColoredBtn
                            type={"submit"}
                            content={"생성하기"}
                            width={"full"}
                            color={"primary"}
                            scale={"normal"}
                        />
                    </form>
                    : null
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