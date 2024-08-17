import {FC} from 'react';
import {Container, ImageWrapper} from "../../instruction.style.ts";
import vacuumMachine from "../../../../assets/instruction_images/vacuum/vacuum_machine.jpg";

const Introduction:FC = () => {
    return (
        <Container>
            <h3>1. 사출 성형기 기기</h3>

            <ImageWrapper>
                <img src={vacuumMachine} alt="사출 성형기 기기"/>
            </ImageWrapper>

            <section>
                <div>
                    <h4>모델명</h4>
                    <p>CR Clarke Vacuum Former 725FLB</p>
                </div>
                <div>
                    <h4>최대 거푸집 높이</h4>
                    <p>152 mm</p>
                </div>
                <div>
                    <h4>권장 재료</h4>
                    <p>조작과 성형이 용이한 PVC 필름, 아크릴 (3 ~ 5 mm)를 사용하는 것을 권장</p>
                    <span>* 아크릴 중, 연질 아크릴은 경화되기에 사용하지 않도록 함</span>
                </div>
                <div>
                    <h4>재료 규격</h4>
                    <p>- 장변 : 450 ~ 500 mm</p>
                    <p>- 단변 : 300 ~ 350 mm</p>
                </div>
                <div>
                    <h4>운용 기기 대수</h4>
                    <p>1대</p>
                </div>
            </section>
        </Container>
    );
};

export default Introduction;