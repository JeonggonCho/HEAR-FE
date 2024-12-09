import styled from "@emotion/styled";


export const VerticalLine = styled.div`
    flex-grow: 1;
    border-left: 2px solid ${({theme}) => theme.colors.line.main};
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
    text-wrap: wrap;
    word-break: break-all;

    a {
        color: ${({theme}) => theme.colors.font.primary};
        text-decoration: underline;
    }
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