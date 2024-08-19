import {FC} from "react";
import {Container, ImageWrapper} from "../../instruction.style.ts";
import on from "@assets/instruction_images/printer/3d_printer_on.jpg";
import thermal from "@assets/instruction_images/printer/3d_printer_thermal.jpg";
import ingredient from "@assets/instruction_images/printer/3d_printer_indredient.jpg";
import thermalSetup from "@assets/instruction_images/printer/3d_printer_thermal_setup.jpg";
import usb from "@assets/instruction_images/printer/3d_printer_usb.jpg";
import copy1 from "@assets/instruction_images/printer/3d_printer_copy_1.jpg";
import copy2 from "@assets/instruction_images/printer/3d_printer_copy_2.jpg";
import copy3 from "@assets/instruction_images/printer/3d_printer_copy_3.jpg";
import copy4 from "@assets/instruction_images/printer/3d_printer_copy_4.jpg";
import copy5 from "@assets/instruction_images/printer/3d_printer_copy_5.jpg";
import copy6 from "@assets/instruction_images/printer/3d_printer_copy_6.jpg";
import copy7 from "@assets/instruction_images/printer/3d_printer_copy_7.jpg";
import removeUsb from "@assets/instruction_images/printer/3d_printer_remove_usb.jpg";
import autoLeveling from "@assets/instruction_images/printer/3d_printer_auto_leveling.jpg";
import cleaner from "@assets/instruction_images/printer/3d_printer_cleaner.jpg";
import nozzle from "@assets/instruction_images/printer/3d_printer_nozzle.jpg";
import axis from "@assets/instruction_images/printer/3d_printer_axis.jpg";
import sharp from "@assets/instruction_images/printer/3d_printer_sharp.jpg";
import touch from "@assets/instruction_images/printer/3d_printer_touch.jpg";

const Usage: FC = () => {
    return (
        <Container>
            <h3>3D 프린터 사용법</h3>

            <section>
                <p>1. 전원 켜기</p>
                <ImageWrapper>
                    <img src={on} alt="전원 켜기"/>
                </ImageWrapper>

                <p>2. 메뉴에서 "온도" 클릭</p>
                <ImageWrapper>
                    <img src={thermal} alt="온도"/>
                </ImageWrapper>

                <p>3. 사용할 재료 클릭 [PLA]</p>
                <ImageWrapper>
                    <img src={ingredient} alt="재료"/>
                </ImageWrapper>

                <p>4. 재료 선택 시, 선택한 재료에 적합한 온도로 설정됨</p>
                <ImageWrapper>
                    <img src={thermalSetup} alt="온도 설정"/>
                </ImageWrapper>

                <p>5. 파일 복사를 위해 기기 상단에 USB 결합</p>
                <span>* USB는 FAT32 포맷의 USB 사용</span>
                <span>* 기기에서 USB를 올바르게 인식할 경우, 기기 화면에 USB 아이콘이 표시됨</span>
                <ImageWrapper>
                    <img src={usb} alt="usb 결합"/>
                </ImageWrapper>

                <p>6. [파일 복사 방법1]</p>
                <span>메뉴 → 유틸리티 → 파일관리자 → 외부메모리 → 파일찾기 → 복사 → 시작</span>
                <ImageWrapper>
                    <img src={copy1} alt="복사 방법 1"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={copy2} alt="복사 방법 2"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={copy3} alt="복사 방법 3"/>
                </ImageWrapper>

                <p>7. [파일 복사 방법2]</p>
                <span>메뉴 → 출력 → 파일 → 외부메모리 → 파일찾기 → 시작</span>
                <ImageWrapper>
                    <img src={copy4} alt="복사 방법 4"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={copy5} alt="복사 방법 5"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={copy6} alt="복사 방법 6"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={copy7} alt="복사 방법 7"/>
                </ImageWrapper>

                <p>8. 시작하면 USB 제거해도 됨</p>
                <ImageWrapper>
                    <img src={removeUsb} alt="usb 제거"/>
                </ImageWrapper>

                <p>9. 오토 레벨링이 자동으로 진행됨</p>
                <span>* 오토 레벨링: 완벽한 프린팅을 위해 수평을 맞추는 과정</span>
                <span>* 짧게는 몇 초에서 길게는 1~2분 걸릴 수 있음</span>
                <ImageWrapper>
                    <img src={autoLeveling} alt="오토 레벨링"/>
                </ImageWrapper>

                <p>10. 오토 레벨링이 실패할 경우, 청소 도구를 이용해 청소하기</p>
                <span>* 도구 분실 시, 경고 1회 및 배상</span>
                <span>* 노즐 주변에 묻어있는 필라멘트 제거</span>
                <ImageWrapper>
                    <img src={cleaner} alt="청소 도구"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={nozzle} alt="노즐 청소"/>
                </ImageWrapper>

                <span>* 베드의 3축 측정 부위에 묻어있는 이물질 제거</span>
                <span>* 절대로 날카로운 물건으로 긁지 않기</span>
                <ImageWrapper>
                    <img src={axis} alt="베드 청소"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={sharp} alt="경고"/>
                </ImageWrapper>

                <p>11. 청소 완료 후, 다시 오토 레벨링 및 프린팅 진행</p>

                <br/>
                <br/>

                <p>12. 프린팅이 완료되면 온도가 떨어진 후, 베드에서 결과물 제거하기</p>
                <span>* 고온의 베드에 접촉 시, 화상의 위험이 있음</span>
                <span>* 온도가 아직 높은 경우, 베드에서 결과물이 잘 안 떨어질 수 있음</span>
                <span>* 온도를 급격히 낮출 경우, 결과물의 수축이 발생할 수 있음</span>
                <ImageWrapper>
                    <img src={touch} alt="화상 주의"/>
                </ImageWrapper>
            </section>
        </Container>
    );
};

export default Usage;