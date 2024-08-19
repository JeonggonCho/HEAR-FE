import {FC} from 'react';
import {IInquiryListItemProps} from "@/types/componentProps.ts";
import {Container} from "./style.ts";
import {inquiryCategoriesValues} from "@constants/inquiryCategories.ts";

const InquiryListItem:FC<IInquiryListItemProps> = (props) => {
    return (
        <Container to={`/inquiry/${props.id}`} category={props.category}>
            <span>{inquiryCategoriesValues[props.category]}</span>
            <div>
                <h3>{props.title}</h3>
                {props.answer &&
                  <span>{props.answer && "답변완료"}</span>
                }
            </div>
            <div>
                <span>{props.author}</span>
                <span>{props.date}</span>
            </div>
        </Container>
    );
};

export default InquiryListItem;