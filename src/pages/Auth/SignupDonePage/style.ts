import styled from "@emotion/styled";
import Lottie from "lottie-react";

export const Container = styled.div`
    width: 100%;

    p {
        color: ${({theme}) => theme.colors.font.main};
        text-align: center;
        margin: 0 0 124px;
        font-size: 20px;
        font-weight: 500;
    }
    
    span {
        color: ${({theme}) => theme.colors.font.primary};
    }
`;

export const LottieWrapper = styled(Lottie)`
    width: 180px;
    height: auto;
    margin: 100px auto 8px;
`;