import {useContext} from "react";
import MoreDropdown from "@components/common/Dropdown/MoreDropdown.tsx";
import DeleteComment from "@components/comment/DeleteComment";
import Icon from "@components/common/Icon";
import useDropdown from "@hooks/useDropdown.ts";
import useModal from "@hooks/useModal.ts";
import CommentContext from "@context/CommentContext.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import more from "@assets/icons/more.svg";


const CommentDropdown = () => {
    const {lang} = useThemeStore();
    const {setIsEditMode} = useContext(CommentContext);
    const {showModal, modalRef, backdropRef, setShowModal} = useModal();
    const {dropdownRef, setShowDropdown, showDropdown} = useDropdown([modalRef, backdropRef]);

    return (
        <MoreDropdown
            trigger={<Icon svg={more} isHovered={true}/>}
            options={[
                {
                    component: <>{buttonCategories.edit[lang]}</>,
                    onClick: () => setIsEditMode(true),
                },
                {
                    component: (
                        <DeleteComment
                            modalRef={modalRef}
                            backdropRef={backdropRef}
                            showModal={showModal}
                            setShowModal={setShowModal}
                        />
                    ),
                    onClick: () => setShowModal(true),
                },
            ]}
            dropdownRef={dropdownRef}
            setShowDropdown={setShowDropdown}
            showDropdown={showDropdown}
        />
    );
};

export default CommentDropdown;