import {useCallback, useEffect, useState} from "react";
import ArrowForward from "@components/common/ArrowForward";
import CardLoading from "@components/skeleton/CardLoading";
import useRequest from "@hooks/useRequest.ts";
import useRolling from "@hooks/useRolling.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {
    Container,
    EmptyNotice,
    ImgWrapper,
    More,
    Notice,
    RollingContent,
    RollingWrapper
} from "./style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import notice from "@assets/images/notice.png";


const NoticeCard = () => {
    const [latestNotices, setLatestNotices] = useState<{noticeId: string, title: string}[]>([]);

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();
    const {setIsHovered, rollingRef, rollingHeight} = useRolling(latestNotices.length, 5000, "18px");

    const fetchLatestNotices = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/notices/latest"
            });
            if (response.data) {
                const notices = response.data;
                setLatestNotices(notices);
            }
        } catch (err) {
            console.error("최신 공지사항 목록 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, setLatestNotices]);

    useEffect(() => {
        fetchLatestNotices();
    }, [fetchLatestNotices]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);


    // 로딩 중인 경우, 스켈레톤 렌더링
    if (isLoading) {
        return <CardLoading heightValue={"55px"}/>
    }

    return (
        <Container>
            <ImgWrapper valid={latestNotices.length > 0}>
                <img src={notice} alt="notice"/>
            </ImgWrapper>

            {latestNotices.length > 0 ?
                <>
                    <RollingWrapper
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        rollingHeight={rollingHeight}
                    >
                        <RollingContent ref={rollingRef}>
                            {latestNotices.map(value => (
                                    <Notice key={value.noticeId} to={`/board/notice/${value.noticeId}`}>
                                        {value.title}
                                    </Notice>
                                )
                            )}
                        </RollingContent>
                    </RollingWrapper>

                    <More to={"/board/notice"}>
                        {buttonCategories.more[lang]} <ArrowForward/>
                    </More>
                </>
                :
                <EmptyNotice>{messageCategories.emptyNotice[lang]}</EmptyNotice>
            }
        </Container>
    );
};

export default NoticeCard;