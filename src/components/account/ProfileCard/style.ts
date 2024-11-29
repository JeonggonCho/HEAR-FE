import styled from "@emotion/styled";


export const ProfileNameWrapper = styled.p`
    width: fit-content;
    margin: 0;
    font-size: 1.15rem;
    line-height: 1.3;
`;

export const EmailWrapper = styled.span`
    text-wrap: wrap;
    word-break: break-all;
    font-size: 0.87rem;
    color: ${({theme}) => theme.colors.font.sub};
`;

export const TableLabelWrapper = styled.span<{lang: "ko" | "en" | "ch"}>`
    width: ${({lang}) => lang === "en" ? "80px" : "68px"};
    color: ${({theme}) => theme.colors.font.sub};
    font-size: 0.9rem;
    line-height: 1.3;
    margin-left: 6px;
`;

export const TableContentWrapper = styled.span`
    text-wrap: wrap;
    line-height: 1.3;
    word-break: break-all;
    font-size: 0.9rem;
`;

export const LabNameWrapper = styled.span<{lab: boolean}>`
    color: ${({theme, lab}) => lab ? theme.colors.font.main : theme.colors.font.danger};
`;