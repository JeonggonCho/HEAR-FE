import {FC} from "react";

import {useThemeStore} from "@store/useThemeStore.ts";
import {printerInstruction} from "@constants/instruction/printerInstruction.ts";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import off from "@assets/instruction_images/printer/3d_printer_off.jpg";
import clean from "@assets/instruction_images/printer/3d_printer_clean.jpg";


const After:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <h3>{printerInstruction.after.afterUsage[lang]}</h3>

            <section>
                <p>{printerInstruction.after.turnOff[lang]}</p>
                <ImageWrapper>
                    <img src={off} alt="전원 끄기"/>
                </ImageWrapper>

                <p>{printerInstruction.after.cleaning[lang]}</p>
                <span>{printerInstruction.after.warningCleaning[lang]}</span>
                <ImageWrapper>
                    <img src={clean} alt="청소"/>
                </ImageWrapper>
            </section>
        </Container>
    );
};

export default After;