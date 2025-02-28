// import {useNavigate, useParams} from "react-router-dom";
import Icon from "@components/common/Icon";
import MoreDropdown from "@components/common/Dropdown/MoreDropdown.tsx";
// import DeleteNotice from "@components/notice/DeleteNotice";
import useModal from "@hooks/useModal.ts";
import useDropdown from "@hooks/useDropdown.ts";
// import {useThemeStore} from "@store/useThemeStore.ts";
// import {buttonCategories} from "@constants/buttonCategories.ts";
import more from "@assets/icons/more.svg";


const NoticeDropdown = () => {
    // const navigate = useNavigate();
    // const {lang} = useThemeStore();
    // const {noticeId} = useParams();
    const {modalRef, backdropRef,
        // showModal, setShowModal
    } = useModal();
    const {dropdownRef, showDropdown, setShowDropdown} = useDropdown([modalRef, backdropRef]);

    // 공지 수정
    // const updateNotice = () => {
    //     navigate(`/board/notice/${noticeId}/update`);
    // };

    return (
        <MoreDropdown
            trigger={<Icon svg={more} isHovered={true}/>}
            options={[
                // <div onClick={updateNotice}>{buttonCategories.edit[lang]}</div>,
                // <DeleteNotice
                //     modalRef={modalRef}
                //     backdropRef={backdropRef}
                //     showModal={showModal}
                //     setShowModal={setShowModal}
                // />
            ]}
            dropdownRef={dropdownRef}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
        />
    );
};

export default NoticeDropdown;