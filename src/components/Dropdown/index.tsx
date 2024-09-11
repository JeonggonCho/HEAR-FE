import {FC, useEffect, useRef, useState} from "react";
import {ReactSVG} from "react-svg";
import {useNavigate} from "react-router-dom";

import Modal from "@components/Modal";
import ConfirmContent from "@components/ConfirmContent";
import ColoredBtn from "@components/ColoredBtn";
import ErrorContent from "@components/ErrorContent";

import {IDropdownProps} from "@/types/componentProps.ts";
import useRequest from "@hooks/useRequest.ts";

import {Container, DropdownWrapper} from "./style.ts";

import deleteIcon from "@assets/icons/delete.svg";
import editIcon from "@assets/icons/edit.svg";
import more from "@assets/icons/more.svg";

const Dropdown:FC<IDropdownProps> = ({type, id}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const navigate = useNavigate();

    const {errorText, clearError, sendRequest} = useRequest();

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const updateLinkHandler = () => {
        switch (type) {
            case "feedback":
                navigate(`/communication/feedback/${id}/update`);
                return;
            case "inquiry":
                navigate(`/communication/inquiry/${id}/update`);
                return;
            case "notice":
                navigate(`/communication/notice/${id}/update`);
                return;
            default:
                return;
        }
    };

    const deleteHandler = async () => {
        const deleteUrl: { [key: string]: string } = {
            feedback: `/feedback/${id}`,
            notice: `/notices/${id}`,
            inquiry: `/inquiries/${id}`
        };

        try {
            await sendRequest({
                url: deleteUrl[type],
                method: "delete",
            });
            navigate(-1);
        } catch (err) {
            console.error("삭제 중 에러 발생: ", err);
        }
    };

    return (
        <Container ref={dropdownRef}>
            <ReactSVG src={more} onClick={() => setShowDropdown((prevState) => !prevState)}/>

            {showDropdown &&
                <DropdownWrapper>
                    <div onClick={updateLinkHandler}>
                        <ReactSVG src={editIcon}/> 수정하기
                    </div>

                    <div onClick={() => {
                        setShowModal(true);
                        setShowDropdown(false);
                    }}>
                        <ReactSVG src={deleteIcon}/> 삭제하기
                    </div>
                </DropdownWrapper>
            }

            {showModal &&
                <Modal
                    content={<ConfirmContent
                        text={"삭제 하시겠습니까?"}
                        leftBtn={<ColoredBtn type={"button"} content={"닫 기"} color={"third"} scale={"normal"} width={"full"} onClick={() => setShowModal(false)}/> }
                        rightBtn={<ColoredBtn type={"submit"} content={"삭 제"} color={"danger"} scale={"normal"} width={"full"} onClick={deleteHandler}/>}
                    />}
                    setModal={setShowModal}
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

export default Dropdown;