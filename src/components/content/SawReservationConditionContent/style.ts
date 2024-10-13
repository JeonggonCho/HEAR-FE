import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;

    h4 {
        margin: 0;
        font-weight: 400;
        font-size: 1rem;
        color: ${({theme}) => theme.colors.font.main};
    }

    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -32px;
        gap: 12px;

        & > div:first-of-type {
            width: 48px;
            height: 48px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    & > div:last-of-type {

    }
`;