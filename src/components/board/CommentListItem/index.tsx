import {FC} from "react";
import {ReactSVG} from "react-svg";

import {
    AuthorWrapper, BtnsWrapper, BtnWrapper,
    Container,
    ContentWrapper,
    LeftPartWrapper,
    ProfileImgWrapper,
    RightPartWrapper
} from "./style.ts";

import noProfile from "@assets/icons/no_profile.svg";

const CommentListItem:FC = () => {
    return (
        <Container>
            <LeftPartWrapper>
                <ProfileImgWrapper>
                    <ReactSVG src={noProfile}/>
                </ProfileImgWrapper>
                <div/>
            </LeftPartWrapper>

            <RightPartWrapper>
                <AuthorWrapper>조정곤</AuthorWrapper>
                <ContentWrapper>와 너무 좋아요!!!</ContentWrapper>
                <BtnsWrapper>
                    <BtnWrapper>좋아요</BtnWrapper>
                    <BtnWrapper>댓글</BtnWrapper>
                </BtnsWrapper>
            </RightPartWrapper>
        </Container>
    );
};

export default CommentListItem;