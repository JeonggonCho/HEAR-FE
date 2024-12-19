import {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import {Header} from "@components/common/Header";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";
import Comments from "@components/comment/Comments";
import Grid from "@components/common/Grid";
import Flex from "@components/common/Flex";
import Icon from "@components/common/Icon";
import Card from "@components/common/Card";
import NoticeDropdown from "@components/notice/NoticeDropdown";
import ArrowBack from "@components/common/ArrowBack";
import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import {IFeedbackProps, IInquiryProps, INotice} from "@/types/componentProps.ts";
import {IComment} from "@/types/comment.ts";
import {useUserDataStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {DateAndCountsWrapper, NoticeContent, NoticeInfoWrapper, NoticeTitleWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import views from "@assets/icons/visible.svg";
import chat from "@assets/icons/chat.svg";


const NoticeDetailPage = () => {
    const [notice, setNotice] = useState<INotice>();
    const [comments, setComments] = useState<IComment[]>([]);

    const {noticeId} = useParams();
    const {userData} = useUserDataStore();
    const {lang, isDarkMode} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();
    const {text, countOfText, handleTextChange, setText} = useTextarea();

    // 공지 생성 일자
    const timeStamp = useMemo(() => {
        return notice?.createdAt ? getTimeStamp(notice.createdAt, lang): '';
    },[notice?.createdAt]);

    // 공지 내용 링크 처리
    const transformedText = useMemo(() => {
        return notice?.content ? generateLinksAndLineBreaks(notice.content) : '';
    }, [notice?.content]);

    // 공지 조회하기
    const fetchNotice = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/notices/${noticeId}`,
            });
            setNotice(response.data.notice);
            setComments(response.data.comments);
        } catch (err) {
            console.error("공지 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, noticeId]);

    useEffect(() => {
        fetchNotice();
    }, [fetchNotice]);

    return (
        <>
            <HeadTag title={notice?.title || headerCategories.noticeDetail[lang]}/>

            <Header bgColor={true}>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.noticeDetail[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            {!isLoading && notice ?
                <>
                    {/*공지 정보 부분*/}
                    <NoticeInfoWrapper>
                        <NoticeTitleWrapper>{notice.title}</NoticeTitleWrapper>
                        <Flex align={"center"} justify={"space-between"}>
                            <DateAndCountsWrapper>
                                <span>{timeStamp}</span>
                                <div>
                                    <Icon svg={views}/>
                                    <span>{notice.views || 0}</span>
                                </div>
                                <div>
                                    <Icon svg={chat}/>
                                    <span>{notice.comments || 0}</span>
                                </div>
                            </DateAndCountsWrapper>

                            {userData?.role === "admin" || userData?.role === "assistant" && noticeId &&
                              <NoticeDropdown/>
                            }
                        </Flex>
                    </NoticeInfoWrapper>

                    {/*공지 내용 부분*/}
                    <NoticeContent darkmode={isDarkMode.toString()} dangerouslySetInnerHTML={{__html: transformedText}}/>

                    {/*댓글 부분*/}
                    <Comments
                        refId={noticeId as string}
                        refType={"notice"}
                        text={text}
                        setText={setText}
                        countOfText={countOfText}
                        handleTextChange={handleTextChange}
                        comments={comments}
                        setComments={setComments}
                        setRefDoc={setNotice as Dispatch<SetStateAction<IInquiryProps | IFeedbackProps | INotice>>}
                    />
                </>
                :
                <Card padding={0} borderRadius={0} bgColor={"sub"}>
                    <Flex align={"center"} justify={"center"} style={{height: "80vh"}}>
                        <LoadingLoop/>
                    </Flex>
                </Card>
            }
        </>
    );
};

export default NoticeDetailPage;