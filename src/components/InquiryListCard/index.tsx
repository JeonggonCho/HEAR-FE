import {FC} from 'react';
import {Container, Inquiry} from "./style.ts";
import myInquiry from "../../assets/images/my_inquiry.png";

const InquiryListCard:FC = () => {
    return (
        <Container>
            <div>
                <img src={myInquiry} alt="나의 문의"/>
                <h3>나의 문의</h3>
            </div>

            <div>
                <Inquiry to={"/"}>
                    <span>3D 프린터 1호기</span>
                    <span>2024.07.30</span>
                </Inquiry>
                <Inquiry to={"/"}>
                    <span>3D 프린터 1호기</span>
                    <span>2024.07.30</span>
                </Inquiry>
                <Inquiry to={"/"}>
                    <span>3D 프린터 1호기</span>
                    <span>2024.07.30</span>
                </Inquiry>
            </div>
        </Container>
    );
};

export default InquiryListCard;