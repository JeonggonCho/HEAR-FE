import {FC} from "react";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";

import {Container} from "./style.ts";

const FeedbackDetailPage:FC = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"피드백"}/>
        </Container>
    );
};

export default FeedbackDetailPage;