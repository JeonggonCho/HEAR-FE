import {FC} from "react";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import fan from "@assets/instruction_images/laser/laser_fan.jpg";
import on from "@assets/instruction_images/laser/laser_on.jpg";
import program from "@assets/instruction_images/laser/laser_program.jpg";
import programWindow from "@assets/instruction_images/laser/laser_program_window.jpg";
import importFile from "@assets/instruction_images/laser/laser_import_file.jpg";
import importFile2 from "@assets/instruction_images/laser/laser_import_file_2.jpg";
import checkFile from "@assets/instruction_images/laser/laser_check_file.jpg";
import mode from "@assets/instruction_images/laser/laser_mode.jpg";
import modeCategories from "@assets/instruction_images/laser/laser_mode_categories.jpg";
import speedPower from "@assets/instruction_images/laser/laser_speed_power.jpg";
import download from "@assets/instruction_images/laser/laser_download.jpg";
import downloadCurrent from "@assets/instruction_images/laser/laser_download_current.jpg";
import loading from "@assets/instruction_images/laser/laser_loading.jpg";
import downloaded from "@assets/instruction_images/laser/laser_downloaded.jpg";
import fileToMachine from "@assets/instruction_images/laser/laser_file_to_machine.jpg";
import guide from "@assets/instruction_images/laser/laser_guide.jpg";
import settingHeight from "@assets/instruction_images/laser/laser_setting_height.jpg";
import start from "@assets/instruction_images/laser/laser_start.jpg";

const Usage:FC = () => {
    return (
        <Container>
            <h3>레이저 커팅기 사용법</h3>

            <section>
                <p>1. 왼쪽 벽면의 환풍기(FAN) 켜기</p>
                <ImageWrapper>
                    <img src={fan} alt="환풍기 켜기"/>
                </ImageWrapper>

                <p>2. 전원 켜기</p>
                <span>* 돌리는 버튼이 아닌 누르는 버튼으로 작동</span>
                <ImageWrapper>
                    <img src={on} alt="전원 켜기"/>
                </ImageWrapper>

                <p>3. 컴퓨터에서 LaserCut 프로그램 실행하기</p>
                <span>* 사용가능한 파일은 cad 파일의 dxf 확장자로 변환해야 함</span>
                <ImageWrapper>
                    <img src={program} alt="프로그램 실행"/>
                </ImageWrapper>

                <span>LaserCut 실행화면</span>
                <ImageWrapper>
                    <img src={programWindow} alt="프로그램 초기화면"/>
                </ImageWrapper>

                <p>4. 파일 불러오기</p>
                <span>메뉴 → File → Import</span>
                <ImageWrapper>
                    <img src={importFile} alt="파일 불러오기"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={importFile2} alt="파일 불러오기2"/>
                </ImageWrapper>

                <p>5. 화면에서 불러온 파일을 확인하기</p>
                <ImageWrapper>
                    <img src={checkFile} alt="파일 확인"/>
                </ImageWrapper>

                <p>6. 좌측상단의 레이어창에서 모드 선택</p>
                <span>* 모드 종류 : Cut(자르기), Engrave(각인), GradeEngrave(그라데이션 각인)</span>
                <span>- 자르기 : 재료를 완전히 절단함</span>
                <span>- 각인 : 일정 강도로 패턴 및 텍스트를 새김</span>
                <span>- 그라데이션 각인 : 강도와 속도를 조절하여 재료 표면에 다양한 깊이와 명암을 표현 (비추천)</span>
                <ImageWrapper>
                    <img src={mode} alt="모드"/>
                </ImageWrapper>

                <span>* LaserCut 프로그램에서는 레이어를 "색상"에 따라서 분류하기에 주의하기</span>
                <span>* 자르는 레이어와 각인 레이어의 색상을 분류할 필요가 있음</span>
                <ImageWrapper>
                    <img src={modeCategories} alt="모드 종류"/>
                </ImageWrapper>

                <p>7. 레이어창에서 스피드와 파워 설정하기</p>
                <span>* 재료의 종류, 두께에 따라서 자르기 모드임에도 잘리지 않을 수 있고, 각인 모드임에도 잘릴 수 있으므로 테스트가 필요함</span>
                <span>* 옵션 종류 : 속도, 세기, 코너 세기</span>
                <span>* 옵션 값은 정답이 없으므로 테스트가 필요함</span>
                <ImageWrapper>
                    <img src={speedPower} alt="스피드 및 파워 설정"/>
                </ImageWrapper>

                <p>8. 설정이 완료되면 아래 "다운로드" 클릭</p>
                <ImageWrapper>
                    <img src={download} alt="다운로드 클릭"/>
                </ImageWrapper>

                <p>9. "Download current" 클릭</p>
                <span>* 만약 이미 다운로드 된 파일이 있으면 "Del all"을 클릭하여 다운로드 내역 지우기</span>
                <ImageWrapper>
                    <img src={downloadCurrent} alt="Download current"/>
                </ImageWrapper>

                <span>로딩 화면</span>
                <ImageWrapper>
                    <img src={loading} alt="로딩 화면"/>
                </ImageWrapper>

                <span>다운로드 된 파일</span>
                <ImageWrapper>
                    <img src={downloaded} alt="다운로드 된 파일"/>
                </ImageWrapper>

                <p>10. 기기에서 다운로드 된 파일 확인</p>
                <ImageWrapper>
                    <img src={fileToMachine} alt="기기에서 파일 확인"/>
                </ImageWrapper>

                <p>11. 기기의 "Test" 버튼 클릭 시, 작업의 전체 영역 크기를 확인할 수 있음</p>
                <span>* 작업 영역이 재료의 크기를 벗어날 경우, 파일을 다시 조정해야 함</span>

                <br/>
                <br/>
                <br/>
                <br/>

                <p>12. 재료를 올린 뒤, 레이저 가이드를 활용하여 레이저 높이 조절하기</p>
                <ImageWrapper>
                    <img src={guide} alt="레이저 가이드"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={settingHeight} alt="레이저 높이 조절"/>
                </ImageWrapper>

                <p>13. 덮개를 닫고 "Start" 버튼 누르고 시작하기</p>
                <span>* 커팅 과정에서 유해물질이 발생할 수 있으므로 반드시 덮개를 닫고 사용하기</span>
                <ImageWrapper>
                    <img src={start} alt="커팅 시작하기"/>
                </ImageWrapper>
            </section>
        </Container>
    );
};

export default Usage;