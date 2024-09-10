import {FC, useMemo} from "react";

import ArrowForward from "@components/ArrowForward";

import {INotice} from "@/types/componentProps.ts";
import getTimeStamp from "@util/getTimeStamp.ts";

import {Container} from "./style.ts";

const NoticeListItem:FC<INotice> = (props) => {
    const timeStamp = useMemo(() => getTimeStamp(props.createdAt), [props.createdAt]);

    return (
        <Container to={`/notice/${props._id}`}>
            <div>
                <h3>{props.title}</h3>
                <span>{timeStamp}</span>
            </div>
            <ArrowForward/>
        </Container>
    );
};

export default NoticeListItem;