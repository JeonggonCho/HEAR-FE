import {FC} from 'react';

import {vacuumInstruction} from "@constants/instruction/vacuumInstruction.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import mould from "@assets/instruction_images/vacuum/vacuum_mould.jpg";
import mould2 from "@assets/instruction_images/vacuum/vacuum_mould2.jpg";

const Preparation:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <section>
                <p>{vacuumInstruction.preparation.mold[lang]}</p>
                <span>{vacuumInstruction.preparation.moldDescription[lang]}</span>
                <span>{vacuumInstruction.preparation.heightLimit[lang]}</span>
                <ImageWrapper>
                    <img src={mould} alt="거푸집"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={mould2} alt="거푸집"/>
                </ImageWrapper>
            </section>
        </Container>
    );
};

export default Preparation;