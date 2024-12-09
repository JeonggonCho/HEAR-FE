import {Dispatch, SetStateAction} from "react";
import {ReactSVG} from "react-svg";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {IFeedbackProps} from "@/types/componentProps.ts";
import {LikeBtnWrapper} from "@components/feedback/LikeFeedback/style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import likes from "@assets/icons/feedback.svg";


interface ILikeFeedbackProps {
    feedbackId: string;
    isLiked: boolean;
    setIsLiked: Dispatch<SetStateAction<boolean>>;
    setFeedback: Dispatch<SetStateAction<IFeedbackProps>>;
}


const LikeFeedback = (
    {
        feedbackId,
        isLiked,
        setIsLiked,
        setFeedback
    }: ILikeFeedbackProps
) => {
    const {lang} = useThemeStore();
    const {sendRequest} = useRequest();

    // 피드백 좋아요
    const likeFeedback = async () => {
        try {
            const response = await sendRequest({
                url: `/feedback/like/${feedbackId}`,
                method: "post",
                data: {},
            });
            if (response.data) {
                setIsLiked(response.data.isLiked);
                setFeedback((prevState) => {
                    if (!prevState) return prevState;
                    return {
                        ...prevState,
                        likes: response.data.likes,
                    };
                });
            }
        } catch (err) {
            console.error("피드백 좋아요 처리 중 에러 발생: ", err);
        }
    };

    return (
        <LikeBtnWrapper
            onClick={likeFeedback}
            isLiked={isLiked}
        >
            <ReactSVG src={likes}/>
            <span>{buttonCategories.like[lang]}</span>
        </LikeBtnWrapper>
    );
};

export default LikeFeedback;