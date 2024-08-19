import {FC} from "react";
import {Container, ImageWrapper} from "../../instruction.style.ts";
import safe from "@assets/instruction_images/saw/saw_safe.jpg";
import sawDirection from "@assets/instruction_images/saw/saw_direction.jpg";

const Warning:FC = () => {
    return (
        <Container>
            <section>
                <p>1. 기기 사용 전, 안전 장비 착용 필수</p>
                <span>반드시 장비를 착용해야하며, 상해를 입을 수 있는 무리한 행동을 하지 않기</span>
                <ImageWrapper>
                    <img src={safe} alt="안전 장비"/>
                </ImageWrapper>

                <p>2. 톱날의 방향을 항상 확인하고 사용</p>
                <ImageWrapper>
                    <img src={sawDirection} alt="톱날 방향 확인"/>
                </ImageWrapper>
            </section>
        </Container>
    );
};

export default Warning;