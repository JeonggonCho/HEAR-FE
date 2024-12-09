import {useContext} from "react";
import Button from "@components/common/Button";
import Flex from "@components/common/Flex";
import Textarea from "@components/common/Textarea";
import useRequest from "@hooks/useRequest.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import CommentContext from "@context/CommentContext.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";


const UpdateComment = () => {
    const {lang} = useThemeStore();
    const {sendRequest} = useRequest();
    const {commentId, setContent, setIsEditMode, textareaRef, handleTextChange, text} = useContext(CommentContext);

    // 댓글 수정
    const updateComment = async () => {
        try {
            const response = await sendRequest({
                url: `/comments/${commentId}`,
                method: "patch",
                data: {content: text},
            });
            if (response.data) {
                const responseData = generateLinksAndLineBreaks(response.data.comment.content);
                setContent(responseData);
                setIsEditMode(false);
            }
        } catch (err) {
            console.error("댓글 수정 중 에러 발생: ", err);
        }
    };

    return (
        <Flex direction={"column"} style={{margin: "12px 0"}}>
            <Textarea
                ref={textareaRef}
                name={"comment-content"}
                showCount={false}
                placeholder={placeholderCategories.comment[lang]}
                changeTextareaHandler={handleTextChange}
                text={text}
                isScrolled={false}
            />
            <Flex align={"center"} gap={6}>
                <Button
                    type={"button"}
                    variant={"text"}
                    width={"fit"}
                    size={"sm"}
                    color={"third"}
                    style={{fontSize: "0.85rem"}}
                    onClick={() => setIsEditMode(false)}
                >
                    {buttonCategories.cancel[lang]}
                </Button>
                <Button
                    type={"button"}
                    variant={"text"}
                    width={"fit"}
                    size={"sm"}
                    color={"third"}
                    style={{fontSize: "0.85rem"}}
                    onClick={updateComment}
                >
                    {buttonCategories.editing[lang]}
                </Button>
            </Flex>
        </Flex>
    );
};

export default UpdateComment;