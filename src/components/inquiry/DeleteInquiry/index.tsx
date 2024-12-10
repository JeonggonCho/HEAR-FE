import {Dispatch, RefObject, SetStateAction} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Button from "@components/common/Button";
import ConfirmModal from "@components/common/Modal/ConfirmModal.tsx";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {confirmModalHeader} from "@components/common/Modal/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


interface IDeleteInquiryProps {
    modalRef: RefObject<HTMLDivElement>;
    backdropRef: RefObject<HTMLDivElement>;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}


const DeleteInquiry = (
    {
        modalRef,
        backdropRef,
        showModal,
        setShowModal
    }: IDeleteInquiryProps
) => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {sendRequest} = useRequest();
    const {inquiryId} = useParams();

    // 문의 삭제
    const deleteInquiry = async () => {
        try {
            await sendRequest({
                url: `/inquiries/${inquiryId}`,
                method: "delete",
            });
            navigate(-1);
        } catch (err) {
            console.error("문의 삭제 중 에러 발생: ", err);
        }
    };

    return (
        <ConfirmModal
            modalRef={modalRef}
            backdropRef={backdropRef}
            showModal={showModal}
            setShowModal={setShowModal}
            trigger={<>{buttonCategories.delete[lang]}</>}
            header={<h4 css={confirmModalHeader}>{messageCategories.delete[lang]}</h4>}
            leftBtn={
                <Button
                    type={"button"}
                    variant={"filled"}
                    color={"third"}
                    size={"md"}
                    width={"full"}
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
                    size={"md"}
                    width={"full"}
                    onClick={deleteInquiry}
                >
                    {buttonCategories.deletion[lang]}
                </Button>
            }
        />
    );
};

export default DeleteInquiry;