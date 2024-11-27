import {useState} from "react";
import Image from "@components/common/Image";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "../../instruction.style.ts";
import {printerInstruction} from "@constants/instruction/printerInstruction.ts";
import modeling1 from "@assets/instruction_images/printer/3d_printer_1-1.jpg";
import modeling2 from "@assets/instruction_images/printer/3d_printer_1-2.jpg";
import modeling3 from "@assets/instruction_images/printer/3d_printer_1-3.jpg";
import modeling4 from "@assets/instruction_images/printer/3d_printer_1-4.jpg";
import modeling5 from "@assets/instruction_images/printer/3d_printer_1-5.jpg";
import modeling6 from "@assets/instruction_images/printer/3d_printer_1-6.jpg";
import modeling7 from "@assets/instruction_images/printer/3d_printer_1-7.jpg";
import modeling8 from "@assets/instruction_images/printer/3d_printer_1-8.jpg";


const Preparation = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);

    const {lang} = useThemeStore();

    const images = [
        modeling1,
        modeling2,
        modeling3,
        modeling4,
        modeling5,
        modeling6,
        modeling7,
        modeling8
    ];

    return (
        <Container>
            <h3>{printerInstruction.preparation.modeling[lang]}</h3>

            <section>
                <p>{printerInstruction.preparation.worktable[lang]}</p>
                <Image images={images} targetIndex={0} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.preparation.save[lang]}</p>
                <Image images={images} targetIndex={1} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
            </section>

            <h3>{printerInstruction.preparation.conversion[lang]}</h3>

            <section>
                <p>{printerInstruction.preparation.activateProgram[lang]}</p>
                <Image images={images} targetIndex={2} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.preparation.importFile[lang]}</p>
                <Image images={images} targetIndex={3} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.preparation.selectMaterial[lang]}</p>
                <Image images={images} targetIndex={4} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.preparation.ready[lang]}</p>
                <span>{printerInstruction.preparation.checkTime[lang]}</span>
                <Image images={images} targetIndex={5} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.preparation.saveGCode[lang]}</p>
                <span>{printerInstruction.preparation.checkSetting[lang]}</span>
                <Image images={images} targetIndex={6} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
            </section>

            <h3>{printerInstruction.preparation.assistantCheck[lang]}</h3>

            <section>
                <p>{printerInstruction.preparation.usb[lang]}</p>
                <span>{printerInstruction.preparation.usbFormat[lang]}</span>
                <Image images={images} targetIndex={7} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.preparation.visitAssistant[lang]}</p>
                <span>{printerInstruction.preparation.call[lang]}</span>
                <span>{printerInstruction.preparation.approvalAssistant[lang]}</span>
            </section>
        </Container>
    );
};

export default Preparation;