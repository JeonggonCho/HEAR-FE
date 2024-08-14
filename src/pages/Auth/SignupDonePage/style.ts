import styled from "@emotion/styled";
import Lottie from "lottie-react";

export const Container = styled.div`
    width: 100%;

    p {
        text-align: center;
        margin: 0 0 124px;
        font-size: 20px;
        font-weight: bold;
    }
    
    span {
        color: #2B65FC;
    }
`;

export const LottieWrapper = styled(Lottie)`
    width: 180px;
    height: auto;
    margin: 100px auto 8px;
`;