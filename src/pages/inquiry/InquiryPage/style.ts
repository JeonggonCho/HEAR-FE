import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    min-height: 100%;
    position: relative;

    p {
        color: ${({theme}) => theme.colors.font.sub};
        line-height: 1.5;
        margin: 12px 0 12px 6px;
    }
`;