import {FC} from "react";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";

import {Container} from "./style.ts";


const UpdateFeedbackPage:FC = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"피드백 수정"}/>
        </Container>
    );
};

export default UpdateFeedbackPage;