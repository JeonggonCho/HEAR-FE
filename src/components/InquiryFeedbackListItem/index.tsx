import {FC, useMemo} from 'react';

import {IFeedbackProps, IInquiryProps} from "@/types/componentProps.ts";
import {inquiryCategoriesValues} from "@constants/inquiryCategories.ts";
import {feedbackCategoriesValues} from "@constants/feedbackCategories.ts";
import getTimeStamp from "@util/getTimeStamp.ts";

import {Container} from "./style.ts";

const InquiryFeedbackListItem:FC<IFeedbackProps | IInquiryProps> = (props) => {
    const timeStamp = useMemo(() => getTimeStamp(props.createdAt), [props.createdAt]);

    const categoryLabel = useMemo(() => {
        if (props.type === "inquiry" && inquiryCategoriesValues.hasOwnProperty(props.category)) {
            return inquiryCategoriesValues[props.category as "machine" | "reservation" | "room" | "etc"];
        } else if (props.type === "feedback" && feedbackCategoriesValues.hasOwnProperty(props.category)) {
            return feedbackCategoriesValues[props.category as "good" | "bad" | "suggest" | "etc"];
        }
        return null;
    }, [props.type, props.category]);

    return (
        <Container
            to={props.type === "inquiry"
                ? `/inquiry/${props._id}`
                : props.type === "feedback"
                    ? `/feedback/${props._id}`
                    : "/"}
            category={props.category}
        >
            <span>{categoryLabel}</span>
            <div>
                <h3>{props.title}</h3>
                {props.answer &&
                  <span>{props.answer && "답변완료"}</span>
                }
            </div>
            <div>
                <span>{props.creator}</span>
                <span>{timeStamp}</span>
            </div>
        </Container>
    );
};

export default InquiryFeedbackListItem;