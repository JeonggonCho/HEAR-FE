import {FC} from 'react';

import {vacuumInstruction} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import vacuumMachine from "@assets/instruction_images/vacuum/vacuum_machine.jpg";

const Introduction:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <h3>{vacuumInstruction.introduction.vacuumMachine[lang]}</h3>

            <ImageWrapper>
                <img src={vacuumMachine} alt="사출 성형기 기기"/>
            </ImageWrapper>

            <section>
                <div>
                    <h4>{vacuumInstruction.introduction.modelName[lang]}</h4>
                    <p>CR Clarke Vacuum Former 725FLB</p>
                </div>
                <div>
                    <h4>{vacuumInstruction.introduction.heightLimit[lang]}</h4>
                    <p>152 mm</p>
                </div>
                <div>
                    <h4>{vacuumInstruction.introduction.validMaterial[lang]}</h4>
                    <p>{vacuumInstruction.introduction.materials[lang]}</p>
                    <span>{vacuumInstruction.introduction.materialWarning[lang]}</span>
                </div>
                <div>
                    <h4>{vacuumInstruction.introduction.materialSize[lang]}</h4>
                    <p>{vacuumInstruction.introduction.longSideLength[lang]}</p>
                    <p>{vacuumInstruction.introduction.shortSideLength[lang]}</p>
                </div>
                <div>
                    <h4>{vacuumInstruction.introduction.countOfMachine[lang]}</h4>
                    <p>{vacuumInstruction.introduction.oneMachine[lang]}</p>
                </div>
            </section>
        </Container>
    );
};

export default Introduction;