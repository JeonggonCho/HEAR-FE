import {FC} from "react";

import {sawInstruction} from "@constants/instruction/sawInstruction.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import cover from "@assets/instruction_images/saw/saw_cover.jpg";
import push from "@assets/instruction_images/saw/saw_push.jpg";
import plug from "@assets/instruction_images/saw/saw_plug.jpg";
import cleaning from "@assets/instruction_images/saw/saw_cleaning.jpg";

const After:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <h3>{sawInstruction.after.sawMachine[lang]}</h3>

            <section>
                <p>{sawInstruction.after.hideBlade[lang]}</p>
                <span>{sawInstruction.after.warning1[lang]}</span>
                <span>{sawInstruction.after.warning2[lang]}</span>
                <ImageWrapper>
                    <img src={cover} alt="덮개 사용"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={push} alt="톱날 내리기"/>
                </ImageWrapper>
            </section>

            <h3>{sawInstruction.after.cleaningStudio[lang]}</h3>

            <section>
                <p>{sawInstruction.after.pullPlug[lang]}</p>
                <ImageWrapper>
                    <img src={plug} alt="플러그 뽑기"/>
                </ImageWrapper>

                <p>{sawInstruction.after.cleaner[lang]}</p>
                <ImageWrapper>
                    <img src={cleaning} alt="청소 및 정리"/>
                </ImageWrapper>
            </section>

            <span>{sawInstruction.after.warning3[lang]}</span>
        </Container>
    );
};

export default After;