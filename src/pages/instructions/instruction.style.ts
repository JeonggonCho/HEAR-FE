import styled from "@emotion/styled";

export const Container = styled.div`
    div + div {
        margin-top: 48px;
    }

    p + div, section {
        margin-bottom: 72px;
    }
    
    div + span {
        margin-top: 48px;
    }

    div + p {
        margin-top: 72px;
    }

    h3 {
        color: #2B65FC;
        font-size: 20px;
        font-weight: bold;
    }

    h4 {
        font-size: 16px;
        color: #999999;
        margin: 0 0 8px;
        font-weight: lighter;
    }

    p {
        font-weight: bold;
        line-height: 1.5;
        margin: 0 0 20px;
        font-size: 18px;
        word-break: keep-all;
    }

    span {
        display: block;
        line-height: 1.5;
        margin: 8px 0;
    }

    a {
        color: #4D7FFF;
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
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
