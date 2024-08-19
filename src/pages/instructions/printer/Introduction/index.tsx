import {FC} from 'react';
import {Container, ImageWrapper} from "../../instruction.style.ts";
import printerMachine from "@assets/instruction_images/printer/3d_printer_machine.jpg";

const Introduction:FC = () => {
    return (
        <Container>
            <h3>1. 3D 프린터 기기</h3>

            <ImageWrapper>
                <img src={printerMachine} alt="3D 프린터 기기"/>
            </ImageWrapper>

            <section>
                <div>
                    <h4>모델명</h4>
                    <p>CUBICON Single Plus 3DP-310F</p>
                </div>
                <div>
                    <h4>작업대 사이즈</h4>
                    <p>240(w) x 190(d) x 200(h)</p>
                </div>
                <div>
                    <h4>재료</h4>
                    <p>CUBICON 흰색 PLA 필라멘트</p>
                </div>
                <div>
                    <h4>확장자</h4>
                    <p>STL(추천), OBJ → GCODE 변환</p>
                </div>
                <div>
                    <h4>GCODE 변환 소프트웨어</h4>
                    <p>Cubicreator
                        <a href={"http://eng.3dcubicon.com/bbs/board.php?bo_table=datalist"}
                           target={'_blank'}>
                            홈페이지 이동
                        </a>
                    </p>
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
                    <p>하루 : 10시 - 18시 (8시간)</p>
                    <span>* 기본적으로 주말 이용이 불가능하며 상황에 따라 탄력 운영</span>
                </div>
                <div>
                    <h4>예약 인원</h4>
                    <p>하루 : 기기 1대당 1명 씩 총 2명</p>
                </div>
                <div>
                    <h4>카드키</h4>
                    <p>학생증을 맡겨야 카드키를 받아갈 수 있음</p>
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