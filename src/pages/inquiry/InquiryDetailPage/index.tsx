import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import {useParams} from "react-router-dom";
import {ReactSVG} from "react-svg";
import {Header} from "@components/common/Header";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";
import Comments from "@components/comment/Comments";
import ProfileImage from "@components/common/ProfileImage";
import Grid from "@components/common/Grid";
import ArrowBack from "@components/common/ArrowBack";
import InquiryDropdown from "@components/inquiry/InquiryDropdown";
import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import {IFeedbackProps, IInquiryProps, INotice} from "@/types/componentProps.ts";
import {IComment} from "@/types/comment.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {
    BtnsWrapper, CommentBtnWrapper,
    ContentWrapper,
    CountsWrapper,
    DateWrapper,
    InquiryInfoWrapper,
    InquiryWrapper, LikeBtnWrapper
} from "./style.ts";
import {TagWrapper, WriterWrapper} from "@components/feedback/InquiryFeedbackListItem/style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import views from "@assets/icons/visible.svg";
import likes from "@assets/icons/feedback.svg";
import chat from "@assets/icons/chat.svg";


const InquiryDetailPage = () => {
    const [inquiry, setInquiry] = useState<IInquiryProps>();
    const [comments, setComments] = useState<IComment[]>([]);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const {inquiryId} = useParams();
    const {userInfo} = useUserInfoStore();
    const {lang, isDarkMode} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();
    const {sendRequest:likeSendRequest} = useRequest();
    const {text, countOfText, handleTextChange, setText} = useTextarea();

    // 문의 생성 날짜 스탬프
    const timeStamp = useMemo(() => {
        return inquiry?.createdAt ? getTimeStamp(inquiry.createdAt, lang) : '';
    }, [inquiry?.createdAt]);

    // 문의 내용 링크 처리
    const transformedText = useMemo(() => {
        return inquiry?.content ?generateLinksAndLineBreaks(inquiry.content): '';
    }, [inquiry?.content]);

    // 문의 디테일 조회
    const fetchInquiry = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/inquiries/${inquiryId}`
            });
            setInquiry(response.data.inquiry);
            setIsLiked(response.data.inquiry.isLiked);
            setComments(response.data.comments);
        } catch (err) {
            console.error("문의 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, inquiryId]);

    useEffect(() => {
        fetchInquiry();
    }, [fetchInquiry]);

    // 문의 좋아요
    const likeInquiry = async () => {
        try {
            const response = await likeSendRequest({
                url: `/inquiries/like/${inquiryId}`,
                method: "post",
                data: {},
            });
            if (response.data) {
                setIsLiked(response.data.isLiked);
                setInquiry((prevState) => {
                    if (!prevState) return prevState;
                    return {
                        ...prevState,
                        likes: response.data.likes,
                    };
                });
            }
        } catch (err) {
            console.error("문의 좋아요 처리 중 에러 발생: ", err);
        }
    };

    // 댓글 버튼 클릭 시
    const commentClickHandler = () => {
        textareaRef.current?.focus();
    };

    return (
        <>
            <HeadTag title={inquiry?.title || headerCategories.inquiryDetail[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.inquiryDetail[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            {!isLoading && inquiry ?
                <>
                    {/*문의 부분*/}
                    <InquiryWrapper>
                        <InquiryInfoWrapper>
                            <div>
                                <div>
                                    <TagWrapper tag={inquiry.category} darkmode={isDarkMode.toString()}>{inquiryCategories[inquiry.category][lang]}</TagWrapper>
                                    <div>
                                        {inquiryId && inquiry && inquiry.creatorId === userInfo?.userId &&
                                          <InquiryDropdown/>
                                        }
                                    </div>
                                </div>
                                <h2>{inquiry.title}</h2>
                            </div>

                            <div>
                                <WriterWrapper>
                                    <ProfileImage size={24}/>
                                    <span>{inquiry.creator}</span>
                                </WriterWrapper>
                                <DateWrapper>{timeStamp}</DateWrapper>

                                <CountsWrapper>
                                    <div>
                                        <ReactSVG src={views}/>
                                        <span>{inquiry.views || 0}</span>
                                    </div>
                                    <div>
                                        <ReactSVG src={likes}/>
                                        <span>{inquiry.likes || 0}</span>
                                    </div>
                                    <div>
                                        <ReactSVG src={chat}/>
                                        <span>{inquiry.comments || 0}</span>
                                    </div>
                                </CountsWrapper>
                            </div>
                        </InquiryInfoWrapper>

                        <ContentWrapper darkmode={isDarkMode.toString()}>
                            <p dangerouslySetInnerHTML={{__html: transformedText}}/>
                        </ContentWrapper>

                        <BtnsWrapper>
                            <LikeBtnWrapper onClick={likeInquiry} isLiked={isLiked}>
                                <ReactSVG src={likes}/>
                                <span>{buttonCategories.like[lang]}</span>
                            </LikeBtnWrapper>
                            <CommentBtnWrapper onClick={commentClickHandler}>
                                <ReactSVG src={chat}/>
                                <span>{buttonCategories.comment[lang]}</span>
                            </CommentBtnWrapper>
                        </BtnsWrapper>
                    </InquiryWrapper>

                    {/*댓글 부분*/}
                    <Comments
                        refId={inquiryId as string}
                        refType={"inquiry"}
                        text={text}
                        setText={setText}
                        textareaRef={textareaRef as MutableRefObject<HTMLTextAreaElement>}
                        countOfText={countOfText}
                        handleTextChange={handleTextChange}
                        comments={comments}
                        setComments={setComments}
                        setRefDoc={setInquiry as Dispatch<SetStateAction<IInquiryProps | IFeedbackProps | INotice>>}
                    />
                </>
                :
                <LoadingLoop/>
            }
        </>
    );
};

export default InquiryDetailPage;