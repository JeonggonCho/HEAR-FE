import {FC} from "react";

import Image from "@components/common/Image";

import {cncInstruction} from "@constants/instruction/cncInstruction.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "../../instruction.style.ts";

import cncMachine from "@assets/instruction_images/cnc/cnc_machine.jpg";


const Introduction:FC = () => {
    const {lang} = useThemeStore();

    const images = [cncMachine];


    return (
        <Container>
            <h3>{cncInstruction.introduction.cncMachine[lang]}</h3>

            <Image images={images} targetIndex={0}/>

            <section>
                <div>
                    <h4>{cncInstruction.introduction.modelName[lang]}</h4>
                    <p>{cncInstruction.introduction.detailName[lang]}</p>
                </div>
                <div>
                    <h4>{cncInstruction.introduction.validMaterial[lang]}</h4>
                    <p>{cncInstruction.introduction.materials[lang]}</p>
                </div>
                <div>
                    <h4>{cncInstruction.introduction.invalidMaterial[lang]}</h4>
                    <p>{cncInstruction.introduction.prohibitedMaterials[lang]}</p>
                    <span>{cncInstruction.introduction.materialWarning[lang]}</span>
                </div>
            </section>

            <h3>{cncInstruction.introduction.rule[lang]}</h3>

            <section>
                <div>
                    <h4>{cncInstruction.introduction.validUser[lang]}</h4>
                    <p>{cncInstruction.introduction.userRule1[lang]}</p>
                    <p>{cncInstruction.introduction.userRule2[lang]}</p>
                </div>
                <div>
                    <h4>{cncInstruction.introduction.reservation[lang]}</h4>
                    <p>{cncInstruction.introduction.reservationRule1[lang]}</p>
                    <p>{cncInstruction.introduction.reservationRule2[lang]}</p>
                </div>
            </section>
        </Container>
    );
};

export default Introduction;