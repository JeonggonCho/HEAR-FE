import {FC} from "react";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import laserMachine from "@assets/instruction_images/laser/laser_machine.jpg";

const Introduction:FC = () => {
    return (
        <Container>
            <h3>1. 레이저 커팅기 기기</h3>

            <ImageWrapper>
                <img src={laserMachine} alt="레이저 커팅기 기기"/>
            </ImageWrapper>

            <section>
                <div>
                    <h4>모델명</h4>
                    <p>Giant Laser KL-900</p>
                </div>
                <div>
                    <h4>작업범위</h4>
                    <p>900 x 600 mm</p>
                </div>
                <div>
                    <h4>확장자</h4>
                    <p>dxf</p>
                </div>
                <div>
                    <h4>사용 가능 재료</h4>
                    <span>- 종이 : 두께 0.5T 이상</span>
                    <span>- 나무 : 두께 3T 이하의 발사, 배스우드와 같은 원목</span>
                    <span>- 아크릴 : 두께 5T 이하</span>
                </div>
                <div>
                    <h4>사용 금지 재료</h4>
                    <span>- 가연성 : 우드락, 포맥스 등</span>
                    <span>- 유해성 : MDF (접착가공목재) 등</span>
                    <span>* 해당 재료 사용 시, 모형제작실 사용 금지</span>
                </div>
                <div>
                    <h4>운용 기기 대수</h4>
                    <p>2대</p>
                </div>
            </section>

            <h3>2. 규칙</h3>

            <section>
                <div>
                    <h4>사용시간</h4>
                    <p>1회 신청에 1시간 사용 / <br/>1일 최대 2회, <br/>1주일 최대 4회까지 예약 가능</p>
                </div>
                <div>
                <h4>운영시간</h4>
                    <p>10:00 AM - 6:00 PM</p>
                    <span>* 시험기간 연장 사용신청은 해당 학년 과대표가 의견을 취합해서 전달 후, 조교 판단 하에 결정</span>
                </div>
                <div>
                    <h4>예약시간</h4>
                    <p>10:00 AM - 5:00 PM (이용 전날 예약)</p>
                </div>
                <div>
                    <h4>경고 사항</h4>
                    <span>- 예약자 외의 타인 사용 불가</span>
                    <span>- 사용시간 중 자리비움 금지</span>
                    <span>- 사용시간이 끝나면 카드키를 조교에게 직접 반납해야하며 다음 이용자에게 전달 금지</span>
                </div>
                <div>
                    <h4>규칙 미준수 시</h4>
                    <p>회당 경고 1회</p>
                </div>
            </section>
        </Container>
    );
};

export default Introduction;