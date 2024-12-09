import {useContext} from "react";
import {LikeBtnWrapper} from "@components/comment/LikeComment/style.ts";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import CommentContext from "@context/CommentContext.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";


const LikeComment = () => {
    const {lang} = useThemeStore();
    const {sendRequest} = useRequest();
    const {commentId, isLiked, setIsLiked, countOfLike, setCountOfLike} = useContext(CommentContext);

    // 댓글 좋아요
    const likeComment = async () => {
        try {
            const response = await sendRequest({
                url: `/comments/like/${commentId}`,
                method: "post",
                data: {},
            });
            if (response.data) {
                if (isLiked) {
                    setCountOfLike(prevState => prevState -= 1);
                } else {
                    setCountOfLike(prevState => prevState += 1);
                }
                setIsLiked(prevState => !prevState);
            }
        } catch (err) {
            console.error("댓글 좋아요 중 에러 발생: ", err);
        }
    };

    return (
        <LikeBtnWrapper
            onClick={likeComment}
            isLiked={isLiked}
        >
            {buttonCategories.like[lang]} {countOfLike || 0}
        </LikeBtnWrapper>
    );
};

export default LikeComment;