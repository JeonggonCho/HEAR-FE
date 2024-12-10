import {useNavigate, useParams} from "react-router-dom";
import {ReactSVG} from "react-svg";
import MoreDropdown from "@components/common/Dropdown/MoreDropdown.tsx";
import DeleteInquiry from "@components/inquiry/DeleteInquiry";
import useModal from "@hooks/useModal.ts";
import useDropdown from "@hooks/useDropdown.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import more from "@assets/icons/more.svg";


const InquiryDropdown = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {inquiryId} = useParams();
    const {modalRef, backdropRef, setShowModal, showModal} = useModal();
    const {dropdownRef, showDropdown, setShowDropdown} = useDropdown([modalRef, backdropRef]);

    // 문의 수정
    const updateInquiry = () => {
        navigate(`/board/inquiry/${inquiryId}/update`);
    };

    return (
        <>
            <MoreDropdown
                trigger={<ReactSVG src={more}/>}
                options={[
                    <div onClick={updateInquiry}>{buttonCategories.edit[lang]}</div>,
                    <DeleteInquiry
                        modalRef={modalRef}
                        backdropRef={backdropRef}
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />,
                ]}
                dropdownRef={dropdownRef}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
            />
        </>
    );
};

export default InquiryDropdown;