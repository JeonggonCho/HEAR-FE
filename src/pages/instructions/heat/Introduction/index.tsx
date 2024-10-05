import {FC} from "react";

import {heatInstruction} from "@constants/instruction/heatInstruction.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import heatMachine from "@assets/instruction_images/heat/heat_machine.jpg";

const Introduction:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <h3>{heatInstruction.introduction.heatMachine[lang]}</h3>

            <ImageWrapper>
                <img src={heatMachine} alt="열선 기기"/>
            </ImageWrapper>

            <section>
                <div>
                    <h4>{heatInstruction.introduction.modelName[lang]}</h4>
                    <p>{heatInstruction.introduction.detailName[lang]}</p>
                </div>
                <div>
                    <h4>{heatInstruction.introduction.size[lang]}</h4>
                    <p>560 x 315 mm</p>
                </div>
                <div>
                    <h4>{heatInstruction.introduction.heightSize[lang]}</h4>
                    <p>210 mm</p>
                </div>
                <div>
                    <h4>{heatInstruction.introduction.validMaterial[lang]}</h4>
                    <p>{heatInstruction.introduction.materials[lang]}</p>
                </div>
            </section>

            <h3>{heatInstruction.introduction.rule[lang]}</h3>

            <section>
                <div>
                    <h4>{heatInstruction.introduction.rental[lang]}</h4>
                    <p>{heatInstruction.introduction.unitLimit[lang]}</p>
                </div>
                <div>
                    <h4>{heatInstruction.introduction.period[lang]}</h4>
                    <p>{heatInstruction.introduction.week[lang]}</p>
                    <span>{heatInstruction.introduction.warning[lang]}</span>
                </div>
                <div>
                    <h4>{heatInstruction.introduction.procedure[lang]}</h4>
                    <p>{heatInstruction.introduction.detailProcedure[lang]}</p>
                </div>
                <div>
                    <h4>{heatInstruction.introduction.wire[lang]}</h4>
                    <p>{heatInstruction.introduction.wireWarning[lang]}</p>
                </div>
            </section>
        </Container>
    );
};

export default Introduction;