import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Toggle from "@components/common/Toggle";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import Flex from "@components/common/Flex";
import DeleteMachine from "@components/management/DeleteMachine";
import useToggle from "@hooks/useToggle.ts";
import useRequest from "@hooks/useRequest.ts";
import MachineSchemaProvider from "@schemata/MachineSchemaProvider.ts";
import {ILasers, IPrinters} from "@/types/machine.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container, ControlWrapper} from "./style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";


const MachineListItem = (
    props: (ILasers | IPrinters) & {
        showEdit: boolean;
        setMachines: Dispatch<SetStateAction<ILasers[]>> | Dispatch<SetStateAction<IPrinters[]>>;
    }
) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const {lang} = useThemeStore();
    const {handleToggle, status, isLoading} = useToggle(props.status, props.url);
    const {sendRequest} = useRequest();
    const {newMachineSchema} = MachineSchemaProvider();

    type MachineFormData = z.infer<typeof newMachineSchema>;

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<MachineFormData>({
        resolver: zodResolver(newMachineSchema),
        defaultValues: {
            name: "",
        },
    });

    // 편집 취소 시, 기기명 수정 취소
    useEffect(() => {
        setIsEdit(false);
    }, [props.showEdit]);

    // 기기명 수정 변경 시, 기존 기기명으로 초기화
    useEffect(() => {
        if (props.name) {
            reset({
                name: props.name,
            })
        }
    }, [props.name, isEdit]);

    // 기기명 수정하기
    const handleEdit = useCallback(async (data: MachineFormData) => {
        try {
            await sendRequest({
                url: props.url,
                method: "patch",
                data: {name: data.name}
            });
            props.setMachines((prevState: any) =>
                prevState.map((machine: any) =>
                    machine._id === props._id ? {...machine, name: data.name} : machine
            ));
            setIsEdit(false);
        } catch (err) {
            console.error("기기명 수정 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    // 기기명 수정 취소하기
    const handleCancelEdit = useCallback(() => {
        setIsEdit(false);
        if (props.name) {
            reset({
                name: props.name,
            })
        }
    }, [setIsEdit, props.name]);

    return (
        <Container
            isEdit={isEdit}
            showEdit={props.showEdit}
            lang={lang}
        >
            {isEdit && props.showEdit ?
                <Input
                    type={"text"}
                    id={"machine-name"}
                    name={"name"}
                    register={register}
                    placeholder={placeholderCategories.machineName[lang]}
                    errorMessage={errors.name?.message}
                />
                : "name" in props && <h3>{props.name}</h3>
            }

            <Flex align={"center"}>
                {!props.showEdit && "status" in props &&
                  <Toggle
                    click={handleToggle}
                    status={status}
                    isLoading={isLoading}
                  />
                }

                <ControlWrapper showEdit={props.showEdit} lang={lang}>
                    {isEdit?
                        <>
                            <Button
                                type={"button"}
                                variant={"filled"}
                                width={"fit"}
                                color={"third"}
                                size={"sm"}
                                onClick={handleCancelEdit}
                            >
                                {buttonCategories.cancel[lang]}
                            </Button>
                            <Button
                                type={"button"}
                                variant={"filled"}
                                width={"fit"}
                                color={"primary"}
                                size={"sm"}
                                onClick={handleSubmit(handleEdit)}
                            >
                                {buttonCategories.complete[lang]}
                            </Button>
                        </>
                        :
                        <>
                            <Button
                                type={"button"}
                                variant={"filled"}
                                width={"fit"}
                                color={"third"}
                                size={"sm"}
                                onClick={() => setIsEdit(true)}
                            >
                                {buttonCategories.editing[lang]}
                            </Button>
                            <DeleteMachine/>
                        </>
                    }
                </ControlWrapper>
            </Flex>
        </Container>
    );
};

export default MachineListItem;