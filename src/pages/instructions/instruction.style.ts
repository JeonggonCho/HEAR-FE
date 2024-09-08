import styled from "@emotion/styled";

export const Container = styled.div`
    div + div {
        margin-top: 48px;
    }

    p + div, section {
        margin-bottom: 72px;
    }
    
    div + span {
        margin-top: 56px;
    }
    
    span + div {
        margin-top: 24px;
    }

    div + p {
        margin-top: 72px;
    }

    h3 {
        color: ${({theme}) => theme.colors.font.primary};
        font-size: 20px;
        font-weight: bold;
    }

    h4 {
        font-size: 16px;
        color: ${({theme}) => theme.colors.font.sub};
        margin: 0 0 8px;
        font-weight: lighter;
    }

    p {
        color: ${({theme}) => theme.colors.font.main};
        font-weight: bold;
        line-height: 1.5;
        margin: 0 0 20px;
        font-size: 18px;
        word-break: keep-all;
    }

    span {     
        color: ${({theme}) => theme.colors.font.main};
        display: block;
        line-height: 1.5;
        margin: 8px 0;
    }

    a {
        color: ${({theme}) => theme.colors.font.primary};
        text-decoration: underline;
        margin: 0 18px;
        font-size: 16px;
    }
`;

export const ImageWrapper = styled.div`
    width: 100%;
    height: auto;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 18px;
    
    & + & {
        margin-top: 0;
    }
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
