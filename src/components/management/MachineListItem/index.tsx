import {FC, useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import Toggle from "@components/common/Toggle";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import ConfirmContent from "@components/content/ConfirmContent";
import ErrorContent from "@components/content/ErrorContent";
import Input from "@components/common/Input";

import {ILasers, IPrinters} from "@/types/machine.ts";
import useToggle from "@hooks/useToggle.ts";
import useRequest from "@hooks/useRequest.ts";
import {newMachineSchema} from "@schemata/machineSchema.ts";

import {Buttons, Container, ControlWrapper} from "./style.ts";

const MachineListItem:FC<(ILasers | IPrinters) & {showEdit: boolean; setMachines: React.Dispatch<React.SetStateAction<ILasers[]>> | React.Dispatch<React.SetStateAction<IPrinters[]>>}> = (props) => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const {handleToggle, status, isLoading} = useToggle(props.status, props.url);

    const {sendRequest, errorText, clearError} = useRequest();

    type MachineFormData = z.infer<typeof newMachineSchema>;

    const {register, handleSubmit, formState: {errors}, reset} = useForm<MachineFormData>({
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

    // 기기 삭제
    const handleDelete = useCallback(async () => {
        try {
            await sendRequest({
                url: props.url,
                method: "delete",
            });
            props.setMachines((prevState:any) => prevState.filter((value:any) => value._id !== props._id));
        } catch (err) {
            console.error("기기 삭제 중 에러: ", err);
        } finally {
            setShowDeleteModal(false);
        }
    }, [sendRequest, props._id]);

    return (
        <Container isEdit={isEdit} showEdit={props.showEdit}>
            {isEdit && props.showEdit ?
                <Input
                    type={"text"}
                    id={"machine-name"}
                    name={"name"}
                    register={register}
                    placeholder={"기기명을 입력해주세요"}
                    errorMessage={errors.name?.message}
                />
                : "name" in props && <h3>{props.name}</h3>
            }

            <Buttons>
                {!props.showEdit && "status" in props &&
                  <Toggle
                    click={handleToggle}
                    status={status}
                    isLoading={isLoading}
                  />
                }

                <ControlWrapper showEdit={props.showEdit}>
                    {isEdit?
                        <>
                            <Button
                                type={"button"}
                                content={"취소"}
                                width={"fit"}
                                color={"third"}
                                scale={"small"}
                                onClick={handleCancelEdit}
                            />
                            <Button
                                type={"button"}
                                content={"완료"}
                                width={"fit"}
                                color={"primary"}
                                scale={"small"}
                                onClick={handleSubmit(handleEdit)}
                            />
                        </>
                        :
                        <>
                            <Button
                                type={"button"}
                                content={"수정"}
                                width={"fit"}
                                color={"third"}
                                scale={"small"}
                                onClick={() => setIsEdit(true)}
                            />
                            <Button
                                type={"button"}
                                content={"삭제"}
                                width={"fit"}
                                color={"danger"}
                                scale={"small"}
                                onClick={() => setShowDeleteModal(true)}
                            />
                        </>
                    }
                </ControlWrapper>
            </Buttons>

            {showDeleteModal &&
              <Modal
                content={<ConfirmContent
                    text={"기기를 삭제 하시겠습니까?"}
                    leftBtn={<Button
                        type={"button"}
                        content={"닫 기"}
                        color={"third"}
                        width={"full"}
                        scale={"normal"}
                        onClick={() => setShowDeleteModal(false)}
                    />}
                    rightBtn={<Button
                        type={"button"}
                        scale={"normal"}
                        color={"danger"}
                        width={"full"}
                        content={"삭 제"}
                        onClick={handleDelete}
                    />}
                />}
                setModal={setShowDeleteModal}
                type={"popup"}
              />
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

export default MachineListItem;