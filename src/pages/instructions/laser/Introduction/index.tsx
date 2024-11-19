import {FC} from "react";

import Image from "@components/common/Image";

import {useThemeStore} from "@store/useThemeStore.ts";
import {laserInstruction} from "@constants/instruction/laserInstruction.ts";

import {Container} from "../../instruction.style.ts";

import laserMachine from "@assets/instruction_images/laser/laser_machine.jpg";


const Introduction:FC = () => {
    const {lang} = useThemeStore();

    const images = [laserMachine];

    return (
        <Container>
            <h3>{laserInstruction.introduction.laserMachine[lang]}</h3>

            <Image images={images} targetIndex={0}/>

            <section>
                <div>
                    <h4>{laserInstruction.introduction.modelName[lang]}</h4>
                    <p>Giant Laser KL-900</p>
                </div>
                <div>
                    <h4>{laserInstruction.introduction.size[lang]}</h4>
                    <p>900 x 600 mm</p>
                </div>
                <div>
                    <h4>{laserInstruction.introduction.extension[lang]}</h4>
                    <p>dxf</p>
                </div>
                <div>
                    <h4>{laserInstruction.introduction.validMaterial[lang]}</h4>
                    <span>{laserInstruction.introduction.paper[lang]}</span>
                    <span>{laserInstruction.introduction.tree[lang]}</span>
                    <span>{laserInstruction.introduction.pvc[lang]}</span>
                </div>
                <div>
                    <h4>{laserInstruction.introduction.invalidMaterial[lang]}</h4>
                    <span>{laserInstruction.introduction.burningMaterials[lang]}</span>
                    <span>{laserInstruction.introduction.harmfulMaterials[lang]}</span>
                    <span>{laserInstruction.introduction.materialWarning[lang]}</span>
                </div>
                <div>
                    <h4>{laserInstruction.introduction.countOfMachine[lang]}</h4>
                    <p>{laserInstruction.introduction.twoMachines[lang]}</p>
                </div>
            </section>

            <h3>{laserInstruction.introduction.rule[lang]}</h3>

            <section>
                <div>
                    <h4>{laserInstruction.introduction.countOfReservation[lang]}</h4>
                    <p>{laserInstruction.introduction.timePerOnce[lang]} / <br/>{laserInstruction.introduction.countPerDay[lang]}, <br/>{laserInstruction.introduction.countPerWeek[lang]}</p>
                </div>
                <div>
                <h4>{laserInstruction.introduction.operatingTime[lang]}</h4>
                    <p>10:00 AM - 6:00 PM</p>
                    <span>{laserInstruction.introduction.extendOperatingTime[lang]}</span>
                </div>
                <div>
                    <h4>{laserInstruction.introduction.reservationTime[lang]}</h4>
                    <p>10:00 AM - 5:00 PM ({laserInstruction.introduction.beforeOneDay[lang]})</p>
                </div>
                <div>
                    <h4>{laserInstruction.introduction.warningList[lang]}</h4>
                    <span>{laserInstruction.introduction.warning1[lang]}</span>
                    <span>{laserInstruction.introduction.warning2[lang]}</span>
                    <span>{laserInstruction.introduction.warning3[lang]}</span>
                </div>
                <div>
                    <h4>{laserInstruction.introduction.breakRule[lang]}</h4>
                    <p>{laserInstruction.introduction.breakRuleDescription[lang]}</p>
                </div>
            </section>
        </Container>
    );
};

export default Introduction;