import {useNavigate, useParams} from "react-router-dom";
import {ReactSVG} from "react-svg";
import MoreDropdown from "@components/common/Dropdown/MoreDropdown.tsx";
import DeleteNotice from "@components/notice/DeleteNotice";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import more from "@assets/icons/more.svg";


const NoticeDropdown = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {noticeId} = useParams();

    // 공지 수정
    const updateNotice = () => {
        navigate(`/board/notice/${noticeId}/update`);
    };

    return (
        <MoreDropdown
            trigger={<ReactSVG src={more}/>}
            options={[
                <div onClick={updateNotice}>{buttonCategories.edit[lang]}</div>,
                <DeleteNotice/>
            ]}
        />
    );
};

export default NoticeDropdown;