import {FC, useMemo} from "react";
import {ReactSVG} from "react-svg";

import {
    AuthorWrapper, BtnsWrapper, BtnWrapper,
    Container,
    ContentWrapper,
    LeftPartWrapper,
    ProfileImgWrapper,
    RightPartWrapper, TimeWrapper
} from "./style.ts";

import {IComment} from "@/types/comment.ts";
import getTimeStamp from "@util/getTimeStamp.ts";

import noProfile from "@assets/icons/no_profile.svg";
import {useThemeStore} from "@store/useThemeStore.ts";

const CommentListItem:FC<IComment> = (props) => {
    const {lang} = useThemeStore();

    const timeStamp = useMemo(() => {
        return props.createdAt ? getTimeStamp(props.createdAt, lang) : '';
    }, [props.createdAt]);

    return (
        <Container>
            <LeftPartWrapper>
                <ProfileImgWrapper>
                    <ReactSVG src={noProfile}/>
                </ProfileImgWrapper>
                <div/>
            </LeftPartWrapper>

            <RightPartWrapper>
                <AuthorWrapper>{props.author}</AuthorWrapper>
                {/*하이퍼링크 처리하기*/}
                <ContentWrapper>{props.content}</ContentWrapper>
                <div>
                    <TimeWrapper>{timeStamp}</TimeWrapper>
                    <BtnsWrapper>
                        <BtnWrapper>좋아요</BtnWrapper>
                        <BtnWrapper>댓글</BtnWrapper>
                    </BtnsWrapper>
                </div>
            </RightPartWrapper>
        </Container>
    );
};

export default CommentListItem;