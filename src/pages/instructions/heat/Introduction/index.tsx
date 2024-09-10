import {FC} from "react";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import heatMachine from "@assets/instruction_images/heat/heat_machine.jpg";

const Introduction:FC = () => {
    return (
        <Container>
            <h3>1. 열선 기기</h3>

            <ImageWrapper>
                <img src={heatMachine} alt="열선 기기"/>
            </ImageWrapper>

            <section>
                <div>
                    <h4>모델명</h4>
                    <p>MANIX 스탠드열선커터기</p>
                </div>
                <div>
                    <h4>크기</h4>
                    <p>560 x 315 mm</p>
                </div>
                <div>
                    <h4>열선 높이</h4>
                    <p>210 mm</p>
                </div>
                <div>
                    <h4>사용 가능 재료</h4>
                    <p>스티로폼, 우드락, 아이소핑크 등의 폼 재료</p>
                </div>
            </section>

            <h3>2. 규칙</h3>

            <section>
                <div>
                    <h4>대여</h4>
                    <p>설계 스튜디오 당 1대 제한</p>
                </div>
                <div>
                    <h4>사용기간</h4>
                    <p>1주일</p>
                    <span>* 기간 내에 반납이 안될 경우, 스튜디오 전체 인원 경고 1회</span>
                </div>
                <div>
                    <h4>대여 절차</h4>
                    <p>스튜디오 반장(대표자)이 조교에게 연락 → 방문 후 신분증 확인 → 열선 수령 → 사용 → 반납</p>
                </div>
                <div>
                    <h4>열선 와이어</h4>
                    <p>열선 와이어는 개인이 별도로 구매해야 함</p>
                </div>
            </section>
        </Container>
    );
};

export default Introduction;