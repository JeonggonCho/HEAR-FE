import {FC, useCallback, useState} from "react";

import Toggle from "@components/Toggle";
import ColoredBtn from "@components/ColoredBtn";
import Modal from "@components/Modal";
import ConfirmContent from "@components/ConfirmContent";

import {ILasers, IPrinters} from "@/types/machine.ts";
import useToggle from "@hooks/useToggle.ts";
import useRequest from "@hooks/useRequest.ts";

import {Container, ControlWrapper} from "./style.ts";
import ErrorContent from "@components/ErrorContent";

const MachineListItem:FC<(ILasers | IPrinters) & {showEdit: boolean; setMachines: React.Dispatch<React.SetStateAction<ILasers[]>> | React.Dispatch<React.SetStateAction<IPrinters[]>>}> = (props) => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const {handleToggle, status, isLoading} = useToggle(props.status, props.url);

    const {sendRequest, errorText, clearError} = useRequest();

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
        <Container>
            {"name" in props && <h3>{props.name}</h3>}
            <div>
                {"status" in props &&
                  <Toggle
                    click={handleToggle}
                    status={status}
                    isLoading={isLoading}
                  />
                }

                <ControlWrapper showEdit={props.showEdit}>
                    <ColoredBtn
                        type={"button"}
                        content={"수정"}
                        width={"fit"}
                        color={"third"}
                        scale={"small"}
                        onClick={() => {}}
                    />
                    <ColoredBtn
                        type={"button"}
                        content={"삭제"}
                        width={"fit"}
                        color={"danger"}
                        scale={"small"}
                        onClick={() => setShowDeleteModal(true)}
                    />
                </ControlWrapper>

                {showDeleteModal &&
                    <Modal
                      content={<ConfirmContent
                          text={"기기를 삭제 하시겠습니까?"}
                          leftBtn={<ColoredBtn
                              type={"button"}
                              content={"닫 기"}
                              color={"third"}
                              width={"full"}
                              scale={"normal"}
                              onClick={() => setShowDeleteModal(false)}
                          />}
                          rightBtn={<ColoredBtn
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
            </div>

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