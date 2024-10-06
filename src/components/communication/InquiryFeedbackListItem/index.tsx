import {FC, useMemo} from 'react';

import {IFeedbackProps, IInquiryProps} from "@/types/componentProps.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";
import {feedbackCategories} from "@constants/feedbackCategories.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, TagWrapper} from "./style.ts";

const InquiryFeedbackListItem:FC<IFeedbackProps | IInquiryProps> = (props) => {
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
            to={props.type === "inquiry" ? `/communication/inquiry/${props._id}`
                : props.type === "feedback" ? `/communication/feedback/${props._id}`
                    : "/"}
        >
            <div>
                <h3>{props.title}</h3>
                {props.answer &&
                  <span>{props.answer && "답변완료"}</span>
                }
                <TagWrapper tag={props.category}>{categoryLabel}</TagWrapper>
            </div>
            <div>

                <div>
                    <span>{props.creator}</span>
                    <span>{timeStamp}</span>
                </div>
            </div>
        </Container>
    );
};

export default InquiryFeedbackListItem;