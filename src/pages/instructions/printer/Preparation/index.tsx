import {FC} from "react";
import {Container, ImageWrapper} from "../../instruction.style.ts";
import modeling1 from "../../../../assets/instruction_images/printer/3d_printer_1-1.jpg";
import modeling2 from "../../../../assets/instruction_images/printer/3d_printer_1-2.jpg";
import modeling3 from "../../../../assets/instruction_images/printer/3d_printer_1-3.jpg";
import modeling4 from "../../../../assets/instruction_images/printer/3d_printer_1-4.jpg";
import modeling5 from "../../../../assets/instruction_images/printer/3d_printer_1-5.jpg";
import modeling6 from "../../../../assets/instruction_images/printer/3d_printer_1-6.jpg";
import modeling7 from "../../../../assets/instruction_images/printer/3d_printer_1-7.jpg";
import modeling8 from "../../../../assets/instruction_images/printer/3d_printer_1-8.jpg";

const Preparation:FC = () => {
    return (
        <Container>
            <h3>1. 모델링</h3>

            <section>
                <p>1-1. 작업대 사이즈 240(w) x 190(d) x 200(h)에 맞추어 모델링하기</p>
                <ImageWrapper>
                    <img src={modeling1} alt="라이노 모델링"/>
                </ImageWrapper>

                <p>1-2. "STL" 확장자로 저장하기</p>
                <ImageWrapper>
                    <img src={modeling2} alt="확장자 저장"/>
                </ImageWrapper>
            </section>

            <h3>2. 파일 변환</h3>

            <section>
                <p>2-1. Cubicreator 프로그램을 실행하고 기기 설정 [3DP-310F]</p>
                <ImageWrapper>
                    <img src={modeling3} alt="기기선택"/>
                </ImageWrapper>

                <p>2-2. Cubicreator 프로그램으로 STL 파일 가져오기</p>
                <ImageWrapper>
                    <img src={modeling4} alt="파일 불러오기"/>
                </ImageWrapper>

                <p>2-3. 메뉴에서 "출력옵션" 클릭 및 필라멘트를 "PLA"로 설정</p>
                <ImageWrapper>
                    <img src={modeling5} alt="출력옵션"/>
                </ImageWrapper>

                <p>2-4. 메뉴에서 "출력준비" 클릭</p>
                <span>* 좌측 모델정보창에서 출력예상시간 확인 가능</span>
                <ImageWrapper>
                    <img src={modeling6} alt="출력준비"/>
                </ImageWrapper>

                <p>2-5. 출력옵션 및 준비가 완료되면 메뉴에서 "GCODE 저장" 클릭</p>
                <span>* 여기서도 출력예상시간 및 사용될 재료량 확인 가능</span>
                <ImageWrapper>
                    <img src={modeling7} alt="gcode 저장"/>
                </ImageWrapper>
            </section>

            <h3>3. 조교 확인</h3>

            <section>
                <p>3-1. USB에 파일담기</p>
                <span>* USB는 FAT32 포맷의 USB 사용</span>
                <ImageWrapper>
                    <img src={modeling8} alt="파일 저장"/>
                </ImageWrapper>

                <p>3-2. 프린팅 전 STL 파일과 GCODE 파일을 가지고 조교 방문</p>
                <span>* 방문 전 미리 예약 및 연락 필요</span>
                <span>* 조교가 형태와 크기, 효율성을 판단하여 사용 여부 결정</span>
            </section>
        </Container>
    );
};

export default Preparation;