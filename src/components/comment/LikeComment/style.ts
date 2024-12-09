import styled from "@emotion/styled";

export const LikeBtnWrapper = styled.span<{isLiked: boolean}>`
    font-size: 0.85rem;
    color: ${({theme, isLiked}) => isLiked ? theme.colors.font.primary : theme.colors.font.sub};
    cursor: pointer;
    transition: all 0.1s ease-in-out 0s;
    margin-left: 6px;
`;