import {useState} from "react";
import Image from "@components/common/Image";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "../../instruction.style.ts";
import {printerInstruction} from "@constants/instruction/printerInstruction.ts";
import off from "@assets/instruction_images/printer/3d_printer_off.jpg";
import clean from "@assets/instruction_images/printer/3d_printer_clean.jpg";


const After = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);

    const {lang} = useThemeStore();

    const images = [off, clean];

    return (
        <Container>
            <h3>{printerInstruction.after.afterUsage[lang]}</h3>

            <section>
                <p>{printerInstruction.after.turnOff[lang]}</p>
                <Image images={images} targetIndex={0} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.after.cleaning[lang]}</p>
                <span>{printerInstruction.after.warningCleaning[lang]}</span>
                <Image images={images} targetIndex={1} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
            </section>
        </Container>
    );
};

export default After;