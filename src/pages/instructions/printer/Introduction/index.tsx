import {FC, useState} from 'react';

import Image from "@components/common/Image";

import {useThemeStore} from "@store/useThemeStore.ts";
import {printerInstruction} from "@constants/instruction/printerInstruction.ts";

import {Container} from "../../instruction.style.ts";

import printerMachine from "@assets/instruction_images/printer/3d_printer_machine.jpg";
import printerMachine2 from "@assets/instruction_images/printer/3d_printer_machine2.jpg";


const Introduction:FC = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);

    const {lang} = useThemeStore();

    const images = [printerMachine, printerMachine2];

    return (
        <Container>
            <h3>{printerInstruction.introduction.machine[lang]}</h3>

            <p>1-1. Cubicon</p>

            <Image images={images} targetIndex={0} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

            <section>
                <div>
                    <h4>{printerInstruction.introduction.name[lang]}</h4>
                    <p>CUBICON Single Plus 3DP-310F</p>
                </div>
                <div>
                    <h4>{printerInstruction.introduction.size[lang]}</h4>
                    <p>240(w) x 190(d) x 200(h)</p>
                </div>
                <div>
                    <h4>{printerInstruction.introduction.material[lang]}</h4>
                    <p>{printerInstruction.introduction.filament[lang]}</p>
                </div>
                <div>
                    <h4>{printerInstruction.introduction.extension[lang]}</h4>
                    <p>{printerInstruction.introduction.recommendedExtension[lang]}</p>
                </div>
                <div>
                    <h4>{printerInstruction.introduction.software[lang]}</h4>
                    <p>Cubicreator
                        <a href={"http://eng.3dcubicon.com/bbs/board.php?bo_table=datalist"}
                           target={'_blank'}>
                            {printerInstruction.introduction.goToLink[lang]}
                        </a>
                    </p>
                </div>
            </section>

            <p>1-2. Creality</p>

            <Image images={images} targetIndex={1} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

            <section>
                <div>
                    <h4>{printerInstruction.introduction.name[lang]}</h4>
                    <p>Creality K1 Max</p>
                </div>
                <div>
                    <h4>{printerInstruction.introduction.size[lang]}</h4>
                    <p>300(w) x 300(d) x 300(h)</p>
                </div>
                <div>
                    <h4>{printerInstruction.introduction.material[lang]}</h4>
                    <p>{printerInstruction.introduction.filament[lang]}</p>
                </div>
                <div>
                    <h4>{printerInstruction.introduction.extension[lang]}</h4>
                    <p>{printerInstruction.introduction.recommendedExtension[lang]}</p>
                </div>
                <div>
                    <h4>{printerInstruction.introduction.software[lang]}</h4>
                    <p>Creality Print
                        <a href={"https://www.creality.com/pages/download-software"}
                           target={'_blank'}>
                            {printerInstruction.introduction.goToLink[lang]}
                        </a>
                    </p>
                </div>
            </section>

            <br/>
            <br/>

            <h3>{printerInstruction.introduction.rule[lang]}</h3>

            <section>
                <div>
                    <h4>{printerInstruction.introduction.usageTime[lang]}</h4>
                    <p>{printerInstruction.introduction.schedule[lang]}</p>
                    <span>{printerInstruction.introduction.weekend[lang]}</span>
                </div>
                <div>
                    <h4>{printerInstruction.introduction.countOfUser[lang]}</h4>
                    <p>{printerInstruction.introduction.manPerMachine[lang]}</p>
                </div>
                <div>
                    <h4>{printerInstruction.introduction.keyCard[lang]}</h4>
                    <p>{printerInstruction.introduction.idCard[lang]}</p>
                </div>
                <div>
                    <h4>{printerInstruction.introduction.warning[lang]}</h4>
                    <p>{printerInstruction.introduction.warningContent[lang]}</p>
                </div>
            </section>
        </Container>
    );
};

export default Introduction;