import {FC} from 'react';
import {IInquiryProps} from "@/types/componentProps.ts";
import {Container} from "./style.ts";
import {inquiryCategoriesValues} from "@constants/inquiryCategories.ts";

const InquiryListItem:FC<IInquiryProps> = (props) => {
    return (
        <Container to={`/inquiry/${props._id}`} category={props.category}>
            <span>{inquiryCategoriesValues[props.category]}</span>
            <div>
                <h3>{props.title}</h3>
                {props.answer &&
                  <span>{props.answer && "답변완료"}</span>
                }
            </div>
            <div>
                <span>{props.creator}</span>
                <span>{props.createdAt}</span>
            </div>
        </Container>
    );
};

export default InquiryListItem;