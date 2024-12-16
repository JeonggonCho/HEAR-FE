import {useContext} from "react";
import MoreDropdown from "@components/common/Dropdown/MoreDropdown.tsx";
import DeleteComment from "@components/comment/DeleteComment";
import Icon from "@components/common/Icon";
import stripHtml from "@util/stripHtml.ts";
import useDropdown from "@hooks/useDropdown.ts";
import useModal from "@hooks/useModal.ts";
import CommentContext from "@context/CommentContext.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import more from "@assets/icons/more.svg";


const CommentDropdown = () => {
    const {lang} = useThemeStore();
    const {content, setText, setIsEditMode} = useContext(CommentContext);
    const {showModal, modalRef, backdropRef, setShowModal} = useModal();
    const {dropdownRef, setShowDropdown, showDropdown} = useDropdown([modalRef, backdropRef]);

    // 댓글 수정 모드로 변경
    const updateCommentMode = () => {
        const plainText = stripHtml(content);
        setText(plainText);
        setIsEditMode(true);
    };

    return (
        <MoreDropdown
            trigger={<Icon svg={more} isHovered={true}/>}
            options={[
                <div onClick={updateCommentMode}>{buttonCategories.edit[lang]}</div>,
                <DeleteComment
                    modalRef={modalRef}
                    backdropRef={backdropRef}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            ]}
            dropdownRef={dropdownRef}
            setShowDropdown={setShowDropdown}
            showDropdown={showDropdown}
        />
    );
};

export default CommentDropdown;