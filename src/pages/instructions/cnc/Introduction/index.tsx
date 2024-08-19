import {FC} from "react";
import {Container, ImageWrapper} from "../../instruction.style.ts";
import cncMachine from "@assets/instruction_images/cnc/cnc_machine.jpg";

const Introduction:FC = () => {
    return (
        <Container>
            <h3>1. CNC 기기</h3>

            <ImageWrapper>
                <img src={cncMachine} alt="CNC 기기"/>
            </ImageWrapper>

            <section>
                <div>
                    <h4>모델명</h4>
                    <p>화인씨앤씨 FX7090</p>
                </div>
                <div>
                    <h4>사용 가능 재료</h4>
                    <p>포맥스, 목재, 스티로폼</p>
                </div>
                <div>
                    <h4>사용 금지 재료</h4>
                    <p>금속재료 : 철판, 알루미늄 등</p>
                    <span>* 해당 재료 사용 시, 모형제작실 사용 금지</span>
                </div>
            </section>

            <h3>2. 규칙</h3>

            <section>
                <div>
                    <h4>사용 가능 대상</h4>
                    <p>- 4학년 이상, CNC 밀링기 사용 교육을 이수한 학생에 한 함</p>
                    <p>- 교수님 허가 하에 조교의 판단으로 사용이 필요한 학생에 한 함</p>
                </div>
                <div>
                    <h4>예약</h4>
                    <p>- 사용 목적과 계획, 사용방법을 담당 조교와 충분히 협의, 교육 후 사용</p>
                    <p>- 사용을 원하는 시간에 평일을 기준으로 48시간 전에 해야 함</p>
                </div>
            </section>
        </Container>
    );
};

export default Introduction;