import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    display: flex;
    gap: 8px;
    margin: 24px 0;
`;

export const ProfileImgWrapper = styled.div`
    border-radius: 50%;
    border: 1px solid ${({theme}) => theme.colors.line.main};
    background-color: ${({theme}) => theme.colors.bg.main};
    width: 28px;
    height: 28px;
    overflow: hidden;
    
    svg {
        fill: ${({theme}) => theme.colors.icon.fill};
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const LeftPartWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    & > div:last-of-type {
        flex-grow: 1;
        border-left: 2px solid ${({theme}) => theme.colors.line.main};
    }
`;

export const RightPartWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 6px;
    flex-grow: 1;
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 6px;
    }
    
    & > div:last-of-type {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-left: 6px;
    }
`;

export const AuthorWrapper = styled.span`
    font-size: 0.9rem;
    font-weight: 500;
`;

export const ContentWrapper = styled.p`
    margin: 12px 0;
    background-color: ${({theme}) => theme.colors.bg.main};
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    font-size: 0.9rem;
    line-height: 1.3;

    a {
        color: ${({theme}) => theme.colors.font.primary};
        text-decoration: underline;
    }
`;

export const BtnsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const LikeBtnWrapper = styled.span<{isLiked: boolean}>`
    font-size: 0.85rem;
    color: ${({theme, isLiked}) => isLiked ? theme.colors.font.primary : theme.colors.font.sub};
    cursor: pointer;
    transition: all 0.1s ease-in-out 0s;
    margin-left: 6px;
`;

export const CommentBtnWrapper = styled.span`
    font-size: 0.85rem;
    color: ${({theme}) => theme.colors.font.sub};
    cursor: pointer;
    transition: all 0.1s ease-in-out 0s;
    margin-left: 6px;
    
    &:hover {
        color: ${({theme}) => theme.colors.font.main};
    }
`;

export const TimeWrapper = styled.span`
    font-size: 0.8rem;
    color: ${({theme}) => theme.colors.font.sub};
`;

export const CommentEditWrapper = styled.div`
    margin: 12px 0;
    display: flex;
    flex-direction: column;
    
    & > div:last-of-type {
        margin-left: auto;
        margin-right: 6px;
    }
`;

export const CancelBtnWrapper = styled.span`
    font-size: 0.9rem;
    color: ${({theme}) => theme.colors.font.sub};
    cursor: pointer;
    transition: all 0.1s ease-in-out 0s;

    &:hover {
        color: ${({theme}) => theme.colors.font.main};
    }
`;

export const EditBtnWrapper = styled.span`
    font-size: 0.9rem;
    color: ${({theme}) => theme.colors.font.primary};
    cursor: pointer;
`;