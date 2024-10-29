import {FC} from "react";

import {useThemeStore} from "@store/useThemeStore.ts";
import {laserInstruction} from "@constants/instruction/laserInstruction.ts";

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
    const {lang} = useThemeStore();

    return (
        <Container>
            <h3>{laserInstruction.usage.laserCutterUsage[lang]}</h3>

            <section>
                <p>{laserInstruction.usage.fanOn[lang]}</p>
                <ImageWrapper>
                    <img src={fan} alt="환풍기 켜기"/>
                </ImageWrapper>

                <p>{laserInstruction.usage.laserOn[lang]}</p>
                <span>{laserInstruction.usage.pushBtn[lang]}</span>
                <ImageWrapper>
                    <img src={on} alt="전원 켜기"/>
                </ImageWrapper>

                <p>{laserInstruction.usage.activeProgram[lang]}</p>
                <span>{laserInstruction.usage.extension[lang]}</span>
                <ImageWrapper>
                    <img src={program} alt="프로그램 실행"/>
                </ImageWrapper>

                <span>{laserInstruction.usage.programWindow[lang]}</span>
                <ImageWrapper>
                    <img src={programWindow} alt="프로그램 초기화면"/>
                </ImageWrapper>

                <p>{laserInstruction.usage.importFile[lang]}</p>
                <span>{laserInstruction.usage.importSequence[lang]}</span>
                <ImageWrapper>
                    <img src={importFile} alt="파일 불러오기"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={importFile2} alt="파일 불러오기2"/>
                </ImageWrapper>

                <p>{laserInstruction.usage.checkFile[lang]}</p>
                <ImageWrapper>
                    <img src={checkFile} alt="파일 확인"/>
                </ImageWrapper>

                <p>{laserInstruction.usage.selectMode[lang]}</p>
                <span>{laserInstruction.usage.modeCategories[lang]}</span>
                <span>{laserInstruction.usage.cut[lang]}</span>
                <span>{laserInstruction.usage.engrave[lang]}</span>
                <span>{laserInstruction.usage.gradient[lang]}</span>
                <ImageWrapper>
                    <img src={mode} alt="모드"/>
                </ImageWrapper>

                <span>{laserInstruction.usage.color[lang]}</span>
                <span>{laserInstruction.usage.divideLayer[lang]}</span>
                <ImageWrapper>
                    <img src={modeCategories} alt="모드 종류"/>
                </ImageWrapper>

                <p>{laserInstruction.usage.setting[lang]}</p>
                <span>{laserInstruction.usage.ingredient[lang]}</span>
                <span>{laserInstruction.usage.options[lang]}</span>
                <span>{laserInstruction.usage.needTest[lang]}</span>
                <ImageWrapper>
                    <img src={speedPower} alt="스피드 및 파워 설정"/>
                </ImageWrapper>

                <p>{laserInstruction.usage.download[lang]}</p>
                <ImageWrapper>
                    <img src={download} alt="다운로드 클릭"/>
                </ImageWrapper>

                <p>{laserInstruction.usage.downloadCurrent[lang]}</p>
                <span>{laserInstruction.usage.resetHistory[lang]}</span>
                <ImageWrapper>
                    <img src={downloadCurrent} alt="Download current"/>
                </ImageWrapper>

                <span>{laserInstruction.usage.loading[lang]}</span>
                <ImageWrapper>
                    <img src={loading} alt="로딩 화면"/>
                </ImageWrapper>

                <span>{laserInstruction.usage.downloadedFile[lang]}</span>
                <ImageWrapper>
                    <img src={downloaded} alt="다운로드 된 파일"/>
                </ImageWrapper>

                <p>{laserInstruction.usage.checkMachine[lang]}</p>
                <ImageWrapper>
                    <img src={fileToMachine} alt="기기에서 파일 확인"/>
                </ImageWrapper>

                <p>{laserInstruction.usage.testBtn[lang]}</p>
                <span>{laserInstruction.usage.readjust[lang]}</span>

                <br/>
                <br/>
                <br/>
                <br/>

                <p>{laserInstruction.usage.guide[lang]}</p>
                <ImageWrapper>
                    <img src={guide} alt="레이저 가이드"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={settingHeight} alt="레이저 높이 조절"/>
                </ImageWrapper>

                <p>{laserInstruction.usage.start[lang]}</p>
                <span>{laserInstruction.usage.cover[lang]}</span>
                <ImageWrapper>
                    <img src={start} alt="커팅 시작하기"/>
                </ImageWrapper>
            </section>
        </Container>
    );
};

export default Usage;