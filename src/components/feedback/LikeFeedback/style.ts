import styled from "@emotion/styled";


export const LikeBtnWrapper = styled.div<{isLiked: boolean}>`
    svg {
        margin-top: 2px;
        width: 20px;
        height: 20px;
        transition: all 0.2s ease-in-out 0s;
        fill: ${({theme, isLiked}) => isLiked ? theme.colors.font.primary : theme.colors.icon.fill};
    }
    
    & > span {
        color: ${({theme, isLiked}) => isLiked ? theme.colors.font.primary : theme.colors.font.sub};
        font-weight: ${({isLiked}) => isLiked ? 500 : 400};
    }
`;