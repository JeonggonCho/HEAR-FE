import styled from "@emotion/styled";


export const StatusLabelWrapper = styled.p`
    margin: 0 0 -2px;
    font-size: 1rem;
    line-height: 1.2;
    text-align: center;
`;

export const StatusMessageWrapper = styled.span`
    font-size: 0.75rem;
    color: ${({theme}) => theme.colors.font.sub};
    text-align: center;
    line-height: 1.2;
`;

export const CenterBar = styled.div`
    min-height: 60px;
    border-left: 1px solid ${({theme}) => theme.colors.font.placeholder};
`;

export const PassStatus = styled.h3<{pass: boolean}>`
    font-size: 1.15rem;
    font-weight: 500;
    margin: 0;
    color: ${({theme, pass}) => pass ? theme.colors.font.primary : theme.colors.font.danger};
    text-align: center;
`;

export const WarningStatus = styled.h3<{warning: number}>`
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0;
    color: ${({theme, warning}) => warning === 0 ? theme.colors.font.primary : warning === 1 ? theme.colors.font.main : theme.colors.font.danger};
    text-align: center;
`;