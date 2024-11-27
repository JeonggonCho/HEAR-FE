import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    min-height: 100%;
    
    & > div:first-of-type {
        background-color: ${({theme}) => theme.colors.bg.main} !important;
    }
`;

export const NoticeListItemWrapper = styled.div`
    margin: 0 24px;
`;