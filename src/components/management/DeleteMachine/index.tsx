import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import Button from "@components/common/Button";
import useModal from "@hooks/useModal.ts";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {confirmModalHeader} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


const DeleteMachine = () => {
    const {lang} = useThemeStore();
    const {modalRef, backdropRef, showModal, setShowModal} = useModal();
    const {sendRequest} = useRequest();

    // 기기 삭제
    const deleteMachineHandler = async () => {
        try {
            await sendRequest({
                url: props.url,
                method: "delete",
            });
            props.setMachines((prevState:any) => prevState.filter((value:any) => value._id !== props._id));
        } catch (err) {
            console.error("기기 삭제 중 에러: ", err);
        } finally {
            setShowModal(false);
        }
    };

    return (
        <ConfirmModal
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            setShowModal={setShowModal}
            trigger={
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"fit"}
                    color={"danger"}
                    size={"sm"}
                    onClick={() => setShowModal(true)}
                >
                    {buttonCategories.deletion[lang]}
                </Button>
            }
            header={
                <h4 css={confirmModalHeader}>{messageCategories.machineDelete[lang]}</h4>
            }
            leftBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    color={"third"}
                    width={"full"}
                    size={"md"}
                    onClick={() => setShowModal(false)}
                >
                    {buttonCategories.close[lang]}
                </Button>
            }
            rightBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    color={"danger"}
                    width={"full"}
                    size={"md"}
                    onClick={deleteMachineHandler}
                >
                    {buttonCategories.deletion[lang]}
                </Button>
            }
        />
    );
};

export default DeleteMachine;