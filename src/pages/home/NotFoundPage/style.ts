import styled from "@emotion/styled";

export const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div:nth-of-type(2) {
        margin-top: 20vh;
        width: 100%;
        padding: 0 24px;

        & > div:first-of-type {
            width: 100px;
            height: 100px;
            overflow: hidden;
            margin: auto auto 8px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        & > p:first-of-type {
            text-align: center;
            margin-bottom: 64px;
            color: ${({theme}) => theme.colors.font.sub};
        }
    }
`;