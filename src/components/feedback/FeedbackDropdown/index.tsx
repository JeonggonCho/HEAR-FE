// import {useNavigate, useParams} from "react-router-dom";
import Icon from "@components/common/Icon";
// import DeleteFeedback from "@components/feedback/DeleteFeedback";
import MoreDropdown from "@components/common/Dropdown/MoreDropdown.tsx";
import useModal from "@hooks/useModal.ts";
import useDropdown from "@hooks/useDropdown.ts";
// import {useThemeStore} from "@store/useThemeStore.ts";
// import {buttonCategories} from "@constants/buttonCategories.ts";
import more from "@assets/icons/more.svg";


const FeedbackDropdown = () => {
    // const navigate = useNavigate();
    // const {lang} = useThemeStore();
    // const {feedbackId} = useParams();
    const {modalRef, backdropRef,
        // showModal, setShowModal
    } = useModal();
    const {showDropdown, setShowDropdown, dropdownRef} = useDropdown([modalRef, backdropRef]);

    // 피드백 수정
    // const updateFeedback = () => {
    //     navigate(`/board/feedback/${feedbackId}/update`);
    // };

    return (
        <MoreDropdown
            trigger={<Icon svg={more} isHovered={true}/>}
            options={[
                // <div onClick={updateFeedback}>{buttonCategories.edit[lang]}</div>,
                // <DeleteFeedback
                //     modalRef={modalRef}
                //     backdropRef={backdropRef}
                //     showModal={showModal}
                //     setShowModal={setShowModal}
                // />,
            ]}
            dropdownRef={dropdownRef}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
        />
    );
};

export default FeedbackDropdown;