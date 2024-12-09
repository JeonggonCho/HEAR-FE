import {useNavigate, useParams} from "react-router-dom";
import {ReactSVG} from "react-svg";
import DeleteFeedback from "@components/feedback/DeleteFeedback";
import MoreDropdown from "@components/common/Dropdown/MoreDropdown.tsx";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import more from "@assets/icons/more.svg";


const FeedbackDropdown = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {feedbackId} = useParams();

    // 피드백 수정
    const updateFeedback = () => {
        navigate(`/board/feedback/${feedbackId}/update`);
    };

    return (
        <MoreDropdown
            trigger={<ReactSVG src={more}/>}
            options={[
                <div onClick={updateFeedback}>{buttonCategories.edit[lang]}</div>,
                <DeleteFeedback/>,
            ]}
        />
    );
};

export default FeedbackDropdown;