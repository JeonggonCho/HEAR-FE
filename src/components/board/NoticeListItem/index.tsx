import {FC, useMemo} from "react";

import ArrowForward from "@components/common/ArrowForward";

import {INotice} from "@/types/componentProps.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

const NoticeListItem:FC<INotice> = (props) => {
    const {lang} = useThemeStore();

    const timeStamp = useMemo(() => getTimeStamp(props.createdAt, lang), [props.createdAt]);

    return (
        <Container to={`/board/notice/${props._id}`}>
            <div>
                <h3>{props.title}</h3>
                <span>{timeStamp}</span>
            </div>
            <ArrowForward/>
        </Container>
    );
};

export default NoticeListItem;