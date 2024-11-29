import styled from "@emotion/styled";


export const ImageWrapper = styled.img<{valid: boolean}>`
    width: 28px;
    filter: ${({valid}) => valid ? "grayscale(0)" : "grayscale(1)"};
    opacity: ${({valid}) => valid ? "1" : "0.5"};
`;

export const CardTitleWrapper = styled.h3<{valid: boolean}>`
    margin: 0;
    font-weight: 500;
    text-wrap: wrap;
    word-break: keep-all;
    line-height: 1.3;
    color: ${({valid, theme}) => valid ? theme.colors.font.main : theme.colors.font.placeholder};
`;

export const AssistantNameWrapper = styled.span`
    color: ${({theme}) => theme.colors.font.main};
`;

export const AssistantLabWrapper = styled.span`
    font-size: 0.9rem;
    color: ${({theme}) => theme.colors.font.sub};
`;

export const EmptyAssistantInfo = styled.div`
    color: ${({theme}) => theme.colors.font.placeholder};
`;