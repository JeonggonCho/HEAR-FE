import {Dispatch, SetStateAction, useCallback} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Flex from "@components/common/Flex";
import Icon from "@components/common/Icon";
import useRequest from "@hooks/useRequest.ts";
import MachineSchemaProvider from "@schemata/MachineSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {TitleWrapper} from "./style.ts";
import {ILasers, IPrinters} from "@/types/machine.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import close from "@assets/icons/close.svg";


interface INewMachineContentProps {
    title: string;
    setModal: Dispatch<SetStateAction<boolean>>;
    machine: "laser" | "printer";
    setMachines: Dispatch<SetStateAction<ILasers[]>> | Dispatch<SetStateAction<IPrinters[]>>
}


const NewMachineContent = (
    {
        title,
        setModal,
        machine,
        setMachines
    }: INewMachineContentProps
) => {
    const {lang} = useThemeStore();
    const {sendRequest} = useRequest();
    const {newMachineSchema} = MachineSchemaProvider();

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
        <>
            <Flex
                direction={"row"}
                align={"center"}
                justify={"space-between"}
                style={{
                    marginBottom: "24px",
                    padding: "0 0 0 4px",
                }}
            >
                <TitleWrapper>{title}</TitleWrapper>
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"fit"}
                    size={"sm"}
                    color={"third"}
                    style={{
                        padding: "4px",
                        borderRadius: "50%",
                    }}
                    onClick={(e) => {
                        e?.stopPropagation();
                        setModal(false);
                    }}
                >
                    <Icon svg={close} size={22} isHovered={true}/>
                </Button>
            </Flex>

            {(machine === "laser" || machine === "printer") &&
                <form onSubmit={machine === "laser" ? machineHandleSubmit(submitLaserHandler) : machine === "printer" ? machineHandleSubmit(submitPrinterHandler) : undefined}>
                  <Flex direction={"column"} gap={24}>
                    <Input
                      label={inputCategories.machineName[lang]}
                      type={"text"}
                      id={"laser-name"}
                      name={"name"}
                      placeholder={placeholderCategories.machineName[lang]}
                      register={machineRegister}
                      errorMessage={machineErrors.name?.message}
                    />

                    <Button
                      type={"submit"}
                      variant={"filled"}
                      width={"full"}
                      color={"primary"}
                      size={"lg"}
                    >
                        {buttonCategories.add[lang]}
                    </Button>
                  </Flex>
                </form>
            }
        </>
    );
};

export default NewMachineContent;