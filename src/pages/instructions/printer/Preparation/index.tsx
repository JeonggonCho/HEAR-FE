import {FC} from "react";

import {useThemeStore} from "@store/useThemeStore.ts";
import {printerInstruction} from "@constants/instruction/printerInstruction.ts";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import modeling1 from "@assets/instruction_images/printer/3d_printer_1-1.jpg";
import modeling2 from "@assets/instruction_images/printer/3d_printer_1-2.jpg";
import modeling3 from "@assets/instruction_images/printer/3d_printer_1-3.jpg";
import modeling4 from "@assets/instruction_images/printer/3d_printer_1-4.jpg";
import modeling5 from "@assets/instruction_images/printer/3d_printer_1-5.jpg";
import modeling6 from "@assets/instruction_images/printer/3d_printer_1-6.jpg";
import modeling7 from "@assets/instruction_images/printer/3d_printer_1-7.jpg";
import modeling8 from "@assets/instruction_images/printer/3d_printer_1-8.jpg";


const Preparation:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <h3>{printerInstruction.preparation.modeling[lang]}</h3>

            <section>
                <p>{printerInstruction.preparation.worktable[lang]}</p>
                <ImageWrapper>
                    <img src={modeling1} alt="라이노 모델링"/>
                </ImageWrapper>

                <p>{printerInstruction.preparation.save[lang]}</p>
                <ImageWrapper>
                    <img src={modeling2} alt="확장자 저장"/>
                </ImageWrapper>
            </section>

            <h3>{printerInstruction.preparation.conversion[lang]}</h3>

            <section>
                <p>{printerInstruction.preparation.activateProgram[lang]}</p>
                <ImageWrapper>
                    <img src={modeling3} alt="기기선택"/>
                </ImageWrapper>

                <p>{printerInstruction.preparation.importFile[lang]}</p>
                <ImageWrapper>
                    <img src={modeling4} alt="파일 불러오기"/>
                </ImageWrapper>

                <p>{printerInstruction.preparation.selectMaterial[lang]}</p>
                <ImageWrapper>
                    <img src={modeling5} alt="출력옵션"/>
                </ImageWrapper>

                <p>{printerInstruction.preparation.ready[lang]}</p>
                <span>{printerInstruction.preparation.checkTime[lang]}</span>
                <ImageWrapper>
                    <img src={modeling6} alt="출력준비"/>
                </ImageWrapper>

                <p>{printerInstruction.preparation.saveGCode[lang]}</p>
                <span>{printerInstruction.preparation.checkSetting[lang]}</span>
                <ImageWrapper>
                    <img src={modeling7} alt="gcode 저장"/>
                </ImageWrapper>
            </section>

            <h3>{printerInstruction.preparation.assistantCheck[lang]}</h3>

            <section>
                <p>{printerInstruction.preparation.usb[lang]}</p>
                <span>{printerInstruction.preparation.usbFormat[lang]}</span>
                <ImageWrapper>
                    <img src={modeling8} alt="파일 저장"/>
                </ImageWrapper>

                <p>{printerInstruction.preparation.visitAssistant[lang]}</p>
                <span>{printerInstruction.preparation.call[lang]}</span>
                <span>{printerInstruction.preparation.approvalAssistant[lang]}</span>
            </section>
        </Container>
    );
};

export default Preparation;