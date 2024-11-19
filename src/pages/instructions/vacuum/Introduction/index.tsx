import {FC} from 'react';

import Image from "@components/common/Image";

import {vacuumInstruction} from "@constants/instruction/vacuumInstruction.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "../../instruction.style.ts";

import vacuumMachine from "@assets/instruction_images/vacuum/vacuum_machine.jpg";


const Introduction:FC = () => {
    const {lang} = useThemeStore();

    const images = [vacuumMachine];

    return (
        <Container>
            <h3>{vacuumInstruction.introduction.vacuumMachine[lang]}</h3>

            <Image images={images} targetIndex={0}/>

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