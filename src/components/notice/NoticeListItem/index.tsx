import {useMemo} from "react";
import ArrowForward from "@components/common/ArrowForward";
import Icon from "@components/common/Icon";
import getTimeStamp from "@util/getTimeStamp.ts";
import {INotice} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container, NoticeInfoWrapper} from "./style.ts";
import views from "@assets/icons/visible.svg";
import chat from "@assets/icons/chat.svg";


const NoticeListItem = (props: INotice) => {
    const {lang} = useThemeStore();

    const timeStamp = useMemo(() => getTimeStamp(props.createdAt, lang), [props.createdAt]);

    return (
        <Container to={`/board/notice/${props._id}`}>
            <div>
                <h3>{props.title}</h3>
                <NoticeInfoWrapper>
                    <span>{timeStamp}</span>
                    <div>
                        <Icon svg={views}/>
                        <span>{props.views}</span>
                    </div>
                    <div>
                        <Icon svg={chat}/>
                        <span>{props.comments}</span>
                    </div>
                </NoticeInfoWrapper>
            </div>
            <ArrowForward/>
        </Container>
    );
};

export default NoticeListItem;