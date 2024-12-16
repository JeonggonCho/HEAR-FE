import styled from "@emotion/styled";


export const LabelWrapper = styled.label`
    font-size: 1rem;
    font-weight: 500;
    color: ${({theme}) => theme.colors.font.main};
`;

export const CutOffPointSettingDescriptionWrapper = styled.p`
    margin: 0;
    font-size: 0.9rem;
    color: ${({theme}) => theme.colors.font.sub};
    line-height: 1.3;
    text-wrap: pretty;
    word-break: break-word;
`;