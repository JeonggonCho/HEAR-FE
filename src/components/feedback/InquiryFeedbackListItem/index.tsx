import {useMemo} from 'react';
import ProfileImage from "@components/common/ProfileImage";
import Icon from "@components/common/Icon";
import getTimeStamp from "@util/getTimeStamp.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {BottomWrapper, Container, InfoWrapper, TagWrapper, TitleWrapper, WriterWrapper} from "./style.ts";
import {IFeedbackProps, IInquiryProps} from "@/types/componentProps.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";
import {feedbackCategories} from "@constants/feedbackCategories.ts";
import views from "@assets/icons/visible.svg";
import likes from "@assets/icons/feedback.svg";
import comments from "@assets/icons/chat.svg";


const InquiryFeedbackListItem = (props: IInquiryProps | IFeedbackProps) => {
    const {lang, isDarkMode} = useThemeStore();

    const timeStamp = useMemo(() => getTimeStamp(props.createdAt, lang), [props.createdAt]);

    const categoryLabel = useMemo(() => {
        if (props.type === "inquiry" && inquiryCategories.hasOwnProperty(props.category)) {
            return inquiryCategories[props.category as "machine" | "reservation" | "room" | "etc"][lang];
        } else if (props.type === "feedback" && feedbackCategories.hasOwnProperty(props.category)) {
            return feedbackCategories[props.category as "good" | "bad" | "suggest" | "etc"][lang];
        }
        return null;
    }, [props.type, props.category]);

    return (
        <Container
            to={props.type === "inquiry" ? `/board/inquiry/${props._id}`
                : props.type === "feedback" ? `/board/feedback/${props._id}`
                    : "/"}
        >
            <TagWrapper tag={props.category} darkmode={isDarkMode.toString()}>{categoryLabel}</TagWrapper>

            <TitleWrapper>
                <h3>{props.title}</h3>
            </TitleWrapper>

            <WriterWrapper>
                <ProfileImage size={24}/>
                <span>{props.creator}</span>
            </WriterWrapper>

            <BottomWrapper darkmode={isDarkMode.toString()}>
                <InfoWrapper>
                    <div>
                        <Icon svg={views}/>
                        <span>{props.views || 0}</span>
                    </div>
                    <div>
                        <Icon svg={likes}/>
                        <span>{props.likes || 0}</span>
                    </div>
                    <div>
                        <Icon svg={comments}/>
                        <span>{props.comments || 0}</span>
                    </div>
                </InfoWrapper>

                <span>{timeStamp}</span>
            </BottomWrapper>
        </Container>
    );
};

export default InquiryFeedbackListItem;