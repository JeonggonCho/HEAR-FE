import {Header} from "@components/common/Header";
import Tab from "@components/common/Tab";
import FloatingButton from "@components/common/FloatingButton";
import HeadTag from "@components/common/HeadTag";
import FeedbackList from "@components/feedback/FeedbackList";
import {useThemeStore} from "@store/useThemeStore.ts";
import {LogoAndTitleWrapper} from "@components/common/Header/style.ts";
import {ITab} from "@/types/tab.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {navCategories} from "@constants/navCategories.ts";
import notice from "@assets/images/notice.png";
import write from "@assets/icons/write.svg";


const FeedbackPage = () => {
    const {lang} = useThemeStore();

    const tabs: ITab[] = [
        { name: buttonCategories.notice[lang], path: "/board/notice", },
        { name: buttonCategories.inquiry[lang], path: "/board/inquiry", },
        { name: buttonCategories.feedback[lang], path: "/board/feedback", },
    ];

    return (
        <>
            <HeadTag title={buttonCategories.feedback[lang]}/>

            <Header bgColor={true}>
                <Header.Left>
                    <LogoAndTitleWrapper>
                        <img src={notice} alt="피드백"/>
                        <h2>{navCategories.board[lang]}</h2>
                    </LogoAndTitleWrapper>
                </Header.Left>
            </Header>

            <Tab type={"line"} tabs={tabs}/>

            <FeedbackList/>

            <FloatingButton
                type={"link"}
                to={"/board/feedback/new"}
                icon={write}
            />
        </>
    );
};

export default FeedbackPage;