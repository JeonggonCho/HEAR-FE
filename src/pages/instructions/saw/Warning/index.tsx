import {FC} from "react";

import {sawInstruction} from "@constants/instruction/sawInstruction.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import safe from "@assets/instruction_images/saw/saw_safe.jpg";
import sawDirection from "@assets/instruction_images/saw/saw_direction.jpg";

const Warning:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <section>
                <p>{sawInstruction.warning.beforeUsing[lang]}</p>
                <span>{sawInstruction.warning.beforeUsingDescription[lang]}</span>
                <ImageWrapper>
                    <img src={safe} alt="안전 장비"/>
                </ImageWrapper>

                <p>{sawInstruction.warning.checkSaw[lang]}</p>
                <ImageWrapper>
                    <img src={sawDirection} alt="톱날 방향 확인"/>
                </ImageWrapper>
            </section>
        </Container>
    );
};

export default Warning;