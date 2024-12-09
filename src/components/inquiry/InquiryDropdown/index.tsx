import {useNavigate, useParams} from "react-router-dom";
import {ReactSVG} from "react-svg";
import MoreDropdown from "@components/common/Dropdown/MoreDropdown.tsx";
import DeleteInquiry from "@components/inquiry/DeleteInquiry";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import more from "@assets/icons/more.svg";


const InquiryDropdown = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {inquiryId} = useParams();

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
                    <DeleteInquiry/>,
                ]}
            />
        </>
    );
};

export default InquiryDropdown;