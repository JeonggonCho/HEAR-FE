import {FC} from "react";

import {useThemeStore} from "@store/useThemeStore.ts";
import {printerInstruction} from "@constants/instruction/printerInstruction.ts";

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
    const {lang} = useThemeStore();

    return (
        <Container>
            <h3>{printerInstruction.usage.method[lang]}</h3>

            <section>
                <p>{printerInstruction.usage.turnOn[lang]}</p>
                <ImageWrapper>
                    <img src={on} alt="전원 켜기"/>
                </ImageWrapper>

                <p>{printerInstruction.usage.selectTemperature[lang]}</p>
                <ImageWrapper>
                    <img src={thermal} alt="온도"/>
                </ImageWrapper>

                <p>{printerInstruction.usage.selectMaterial[lang]}</p>
                <ImageWrapper>
                    <img src={ingredient} alt="재료"/>
                </ImageWrapper>

                <p>{printerInstruction.usage.settingTemperature[lang]}</p>
                <ImageWrapper>
                    <img src={thermalSetup} alt="온도 설정"/>
                </ImageWrapper>

                <p>{printerInstruction.usage.linkUsb[lang]}</p>
                <span>{printerInstruction.usage.usbFormat[lang]}</span>
                <span>{printerInstruction.usage.usbIcon[lang]}</span>
                <ImageWrapper>
                    <img src={usb} alt="usb 결합"/>
                </ImageWrapper>

                <p>{printerInstruction.usage.copyMethod1[lang]}</p>
                <span>{printerInstruction.usage.copyMethod1Sequence[lang]}</span>
                <ImageWrapper>
                    <img src={copy1} alt="복사 방법 1"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={copy2} alt="복사 방법 2"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={copy3} alt="복사 방법 3"/>
                </ImageWrapper>

                <p>{printerInstruction.usage.copyMethod2[lang]}</p>
                <span>{printerInstruction.usage.copyMethod2Sequence[lang]}</span>
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

                <p>{printerInstruction.usage.removeUsb[lang]}</p>
                <ImageWrapper>
                    <img src={removeUsb} alt="usb 제거"/>
                </ImageWrapper>

                <p>{printerInstruction.usage.autoLeveling[lang]}</p>
                <span>{printerInstruction.usage.defAutoLeveling[lang]}</span>
                <span>{printerInstruction.usage.autoLevelingTime[lang]}</span>
                <ImageWrapper>
                    <img src={autoLeveling} alt="오토 레벨링"/>
                </ImageWrapper>

                <p>{printerInstruction.usage.failAutoLeveling[lang]}</p>
                <span>{printerInstruction.usage.toolWarning[lang]}</span>
                <span>{printerInstruction.usage.removeFilament[lang]}</span>
                <ImageWrapper>
                    <img src={cleaner} alt="청소 도구"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={nozzle} alt="노즐 청소"/>
                </ImageWrapper>

                <span>{printerInstruction.usage.cleaningWorktable[lang]}</span>
                <span>{printerInstruction.usage.warningSharp[lang]}</span>
                <ImageWrapper>
                    <img src={axis} alt="베드 청소"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={sharp} alt="경고"/>
                </ImageWrapper>

                <p>{printerInstruction.usage.reAutoLeveling[lang]}</p>

                <br/>
                <br/>

                <p>{printerInstruction.usage.detachResult[lang]}</p>
                <span>{printerInstruction.usage.warningBurn[lang]}</span>
                <span>{printerInstruction.usage.warningDetach[lang]}</span>
                <span>{printerInstruction.usage.warningShrink[lang]}</span>
                <ImageWrapper>
                    <img src={touch} alt="화상 주의"/>
                </ImageWrapper>
            </section>
        </Container>
    );
};

export default Usage;