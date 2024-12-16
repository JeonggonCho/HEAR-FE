import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import {useParams} from "react-router-dom";
import {Header} from "@components/common/Header";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";
import Comments from "@components/comment/Comments";
import ProfileImage from "@components/common/ProfileImage";
import Grid from "@components/common/Grid";
import Icon from "@components/common/Icon";
import FeedbackDropdown from "@components/feedback/FeedbackDropdown";
import LikeFeedback from "@components/feedback/LikeFeedback";
import ArrowBack from "@components/common/ArrowBack";
import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import {IFeedbackProps, IInquiryProps, INotice} from "@/types/componentProps.ts";
import {IComment} from "@/types/comment.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {
    BtnsWrapper, CommentBtnWrapper,
    ContentWrapper,
    CountsWrapper,
    DateWrapper,
    FeedbackInfoWrapper,
    FeedbackWrapper,
} from "./style.ts";
import {TagWrapper, WriterWrapper} from "@components/feedback/InquiryFeedbackListItem/style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {feedbackCategories} from "@constants/feedbackCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import views from "@assets/icons/visible.svg";
import likes from "@assets/icons/feedback.svg";
import chat from "@assets/icons/chat.svg";


const FeedbackDetailPage = () => {
    const [feedback, setFeedback] = useState<IFeedbackProps>();
    const [comments, setComments] = useState<IComment[]>([]);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const {feedbackId} = useParams();
    const {userInfo} = useUserInfoStore();
    const {lang, isDarkMode} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();
    const {text, countOfText, handleTextChange, setText, textareaRef} = useTextarea();

    // 피드백 생성 일자
    const timeStamp = useMemo(() => {
        return feedback?.createdAt ? getTimeStamp(feedback.createdAt, lang) : '';
    }, [feedback?.createdAt]);

    // 피드백 내용 링크 처리
    const transformedText = useMemo(() => {
        return feedback?.content ? generateLinksAndLineBreaks(feedback.content) : '';
    }, [feedback?.content]);

    // 피드백 디테일 조회
    const fetchFeedback = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/feedback/${feedbackId}`
            });
            setFeedback(response.data.feedback);
            setIsLiked(response.data.feedback.isLiked);
            setComments(response.data.comments);
        } catch (err) {
            console.error("피드백 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, feedbackId]);

    useEffect(() => {
        fetchFeedback();
    }, [fetchFeedback]);

    // 댓글 버튼 클릭 시
    const commentClickHandler = () => {
        textareaRef.current?.focus();
    };

    return (
        <>
            <HeadTag title={feedback?.title || headerCategories.feedbackDetail[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.feedbackDetail[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            {!isLoading && feedback ?
                <>
                    {/*피드백 부분*/}
                    <FeedbackWrapper>
                        <FeedbackInfoWrapper>
                            <div>
                                <div>
                                    <TagWrapper tag={feedback.category} darkmode={isDarkMode.toString()}>{feedbackCategories[feedback.category][lang]}</TagWrapper>
                                    <div>
                                        {feedbackId && feedback.creatorId === userInfo?.userId &&
                                            <FeedbackDropdown/>
                                        }
                                    </div>
                                </div>
                                <h2>{feedback.title}</h2>
                            </div>

                            <div>
                                <WriterWrapper>
                                    <ProfileImage size={24}/>
                                    <span>{feedback.creator}</span>
                                </WriterWrapper>
                                <DateWrapper>{timeStamp}</DateWrapper>

                                <CountsWrapper>
                                    <div>
                                        <Icon svg={views}/>
                                        <span>{feedback.views || 0}</span>
                                    </div>
                                    <div>
                                        <Icon svg={likes}/>
                                        <span>{feedback.likes || 0}</span>
                                    </div>
                                    <div>
                                        <Icon svg={chat}/>
                                        <span>{feedback.comments || 0}</span>
                                    </div>
                                </CountsWrapper>
                            </div>
                        </FeedbackInfoWrapper>

                        <ContentWrapper darkmode={isDarkMode.toString()}>
                            <p dangerouslySetInnerHTML={{__html: transformedText}}/>
                        </ContentWrapper>

                        <BtnsWrapper>
                            <LikeFeedback
                                feedbackId={feedbackId as string}
                                isLiked={isLiked}
                                setIsLiked={setIsLiked}
                                setFeedback={setFeedback as Dispatch<SetStateAction<IFeedbackProps>>}
                            />
                            <CommentBtnWrapper onClick={commentClickHandler}>
                                <Icon svg={chat}/>
                                <span>{buttonCategories.comment[lang]}</span>
                            </CommentBtnWrapper>
                        </BtnsWrapper>
                    </FeedbackWrapper>

                    {/*댓글 부분*/}
                    <Comments
                        refId={feedbackId as string}
                        refType={"feedback"}
                        text={text}
                        setText={setText}
                        textareaRef={textareaRef as MutableRefObject<HTMLTextAreaElement>}
                        countOfText={countOfText}
                        handleTextChange={handleTextChange}
                        comments={comments}
                        setComments={setComments}
                        setRefDoc={setFeedback as Dispatch<SetStateAction<IInquiryProps | IFeedbackProps | INotice>>}
                    />
                </>
                :
                <LoadingLoop/>
            }
        </>
    );
};

export default FeedbackDetailPage;