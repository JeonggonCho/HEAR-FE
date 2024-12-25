import {useContext} from "react";
import {z} from "zod";
import Button from "@components/common/Button";
import Flex from "@components/common/Flex";
import Textarea from "@components/common/Textarea";
import useRequest from "@hooks/useRequest.ts";
import BoardSchemaProvider from "@schemata/BoardSchemaProvider.ts";
import stripHtml from "@util/stripHtml.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import CommentContext from "@context/CommentContext.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";


const UpdateComment = () => {
    const {lang} = useThemeStore();
    const {sendRequest} = useRequest();
    const {
        commentId,
        setIsEditMode,
        textareaRef,
        register,
        isValid,
        handleSubmit,
        setValue,
    } = useContext(CommentContext);
    const {commentSchema} = BoardSchemaProvider();

    type CommentFormDataType = z.infer<typeof commentSchema>;

    // 댓글 수정
    const updateComment = async (data: CommentFormDataType) => {
        try {
            const response = await sendRequest({
                url: `/comments/${commentId}`,
                method: "patch",
                data: {content: data.content},
            });
            if (response.data) {
                setValue("content", stripHtml(response.data.comment.content));
                setIsEditMode(false);
            }
        } catch (err) {
            console.error("댓글 수정 중 에러 발생: ", err);
        }
    };

    return (
        <form onSubmit={handleSubmit(updateComment)}>
            <Flex direction={"column"} style={{margin: "12px 0"}}>
                <Textarea
                    register={register}
                    ref={textareaRef}
                    name={"content"}
                    showCount={false}
                    placeholder={placeholderCategories.comment[lang]}
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
                        type={"submit"}
                        variant={"text"}
                        width={"fit"}
                        size={"sm"}
                        color={"third"}
                        style={{fontSize: "0.85rem"}}
                        disabled={!isValid}
                    >
                        {buttonCategories.editing[lang]}
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
};

export default UpdateComment;