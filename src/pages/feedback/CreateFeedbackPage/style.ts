import styled from "@emotion/styled";


export const DescriptionWrapper = styled.p`
    width: 80%;
    color: ${({theme}) => theme.colors.font.sub};
    line-height: 1.5;
    margin: 0 0 24px 30px;
    text-wrap: wrap;
    word-break: keep-all;
    font-size: 0.9rem;
`;