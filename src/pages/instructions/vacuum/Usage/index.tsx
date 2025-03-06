import {useState} from 'react';
import Image from "@components/common/Image";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "../../instruction.style.ts";
import {vacuumInstruction} from "@constants/instruction/vacuumInstruction.ts";
import controllers from "@assets/instruction_images/vacuum/vacuum_controllers.jpg";
import on from "@assets/instruction_images/vacuum/vacuum_on.jpg";
import heat from "@assets/instruction_images/vacuum/vacuum_heat.jpg";
import mould from "@assets/instruction_images/vacuum/vacuum_mould.jpg";
import leverUp from "@assets/instruction_images/vacuum/vacuum_lever_up.jpg";
import modelDown from "@assets/instruction_images/vacuum/vacuum_model_down.jpg";
import material from "@assets/instruction_images/vacuum/vacuum_material.jpg";
import fit from "@assets/instruction_images/vacuum/vacuum_fit.jpg";
import pullHeat from "@assets/instruction_images/vacuum/vacuum_pull_heat.jpg";
import timer from "@assets/instruction_images/vacuum/vacuum_timer.jpg";
import pushHeat from "@assets/instruction_images/vacuum/vacuum_push_heat.jpg";
import vacuumPump from "@assets/instruction_images/vacuum/vacuum_pump.jpg";
import pushLever from "@assets/instruction_images/vacuum/vacuum_push_lever.jpg";
import pressure from "@assets/instruction_images/vacuum/vacuum_pressure.jpg";
import mouldUp from "@assets/instruction_images/vacuum/vacuum_mould_up.jpg";
import remove from "@assets/instruction_images/vacuum/vacuum_remove.jpg";
import finish from "@assets/instruction_images/vacuum/vacuum_finish.jpg";


const Usage = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);

    const {lang} = useThemeStore();

    const images = [
        controllers,
        on,
        heat,
        mould,
        leverUp,
        modelDown,
        material,
        fit,
        pullHeat,
        timer,
        pushHeat,
        vacuumPump,
        pushLever,
        pressure,
        mouldUp,
        remove,
        finish,
    ];

    return (
        <Container>
            <section>
                <p>{vacuumInstruction.usage.controllers[lang]}</p>
                <span>① {vacuumInstruction.usage.power[lang]}</span>
                <span>② Vacuum pump</span>
                <span>③ {vacuumInstruction.usage.heat[lang]}</span>
                <span>④ {vacuumInstruction.usage.pressure[lang]}</span>
                <span>⑤ {vacuumInstruction.usage.timer[lang]}</span>
                <Image images={images} targetIndex={0} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{vacuumInstruction.usage.on[lang]}</p>
                <Image images={images} targetIndex={1} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{vacuumInstruction.usage.onHeating[lang]}</p>
                <Image images={images} targetIndex={2} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{vacuumInstruction.usage.putMold[lang]}</p>
                <Image images={images} targetIndex={3} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{vacuumInstruction.usage.liftLever[lang]}</p>
                <Image images={images} targetIndex={4} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <Image images={images} targetIndex={5} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{vacuumInstruction.usage.placeMaterial[lang]}</p>
                <Image images={images} targetIndex={6} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <Image images={images} targetIndex={7} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{vacuumInstruction.usage.positionHeatingPlate[lang]}</p>
                <Image images={images} targetIndex={8} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{vacuumInstruction.usage.settingTimer[lang]}</p>
                <Image images={images} targetIndex={9} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{vacuumInstruction.usage.onVacuumPump[lang]}</p>
                <Image images={images} targetIndex={10} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <Image images={images} targetIndex={11} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{vacuumInstruction.usage.pushLever[lang]}</p>
                <Image images={images} targetIndex={12} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <Image images={images} targetIndex={13} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{vacuumInstruction.usage.pushPressureButton[lang]}</p>
                <Image images={images} targetIndex={14} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{vacuumInstruction.usage.downMold[lang]}</p>
                <Image images={images} targetIndex={15} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{vacuumInstruction.usage.complete[lang]}</p>
                <Image images={images} targetIndex={16} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{vacuumInstruction.usage.turnOff[lang]}</p>
            </section>
        </Container>
    );
};

export default Usage;