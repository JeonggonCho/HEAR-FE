import {FC} from "react";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";

import {Container} from "./style.ts";

const UpdateInquiryPage:FC = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"문의 수정"}/>
        </Container>
    );
};

export default UpdateInquiryPage;