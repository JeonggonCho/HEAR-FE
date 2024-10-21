import {FC, useMemo} from 'react';
import {ReactSVG} from "react-svg";

import {IFeedbackProps, IInquiryProps} from "@/types/componentProps.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";
import {feedbackCategories} from "@constants/feedbackCategories.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {BottomWrapper, Container, InfoWrapper, TagWrapper, TitleWrapper, WriterWrapper} from "./style.ts";

import noProfile from "@assets/icons/no_profile.svg";
import views from "@assets/icons/visible.svg";
import likes from "@assets/icons/feedback.svg";
import comments from "@assets/icons/chat.svg";

const InquiryFeedbackListItem:FC<IInquiryProps | IFeedbackProps> = (props) => {
    const {lang} = useThemeStore();

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
            <TagWrapper tag={props.category}>{categoryLabel}</TagWrapper>

            <TitleWrapper>
                <h3>{props.title}</h3>
                {props.answer &&
                  <span>{props.answer && "답변완료"}</span>
                }
            </TitleWrapper>

            <WriterWrapper>
                <div>
                    <ReactSVG src={noProfile}/>
                </div>
                <span>{props.creator}</span>
            </WriterWrapper>

            <BottomWrapper>
                <InfoWrapper>
                    <div>
                        <ReactSVG src={views}/>
                        <span>{props.views || 0}</span>
                    </div>
                    <div>
                        <ReactSVG src={likes}/>
                        <span>{props.likes || 0}</span>
                    </div>
                    <div>
                        <ReactSVG src={comments}/>
                        <span>{props.comments || 0}</span>
                    </div>
                </InfoWrapper>

                <span>{timeStamp}</span>
            </BottomWrapper>
        </Container>
    );
};

export default InquiryFeedbackListItem;