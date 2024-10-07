import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    min-height: 100%;

    p {
        width: 80%;
        color: ${({theme}) => theme.colors.font.sub};
        line-height: 1.5;
        margin: 28px 0 16px 6px;
        text-wrap: wrap;
        word-break: keep-all;
    }
`;