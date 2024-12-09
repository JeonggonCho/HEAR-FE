import {useContext} from "react";
import {ReactSVG} from "react-svg";
import MoreDropdown from "@components/common/Dropdown/MoreDropdown.tsx";
import DeleteComment from "@components/comment/DeleteComment";
import stripHtml from "@util/stripHtml.ts";
import CommentContext from "@context/CommentContext.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import more from "@assets/icons/more.svg";


const CommentDropdown = () => {
    const {lang} = useThemeStore();
    const {content, setText, setIsEditMode} = useContext(CommentContext);

    // 댓글 수정 모드로 변경
    const updateCommentMode = () => {
        const plainText = stripHtml(content);
        setText(plainText);
        setIsEditMode(true);
    };

    return (
        <MoreDropdown
            trigger={<ReactSVG src={more}/>}
            options={[
                <div onClick={updateCommentMode}>{buttonCategories.edit[lang]}</div>,
                <DeleteComment/>
            ]}
        />
    );
};

export default CommentDropdown;