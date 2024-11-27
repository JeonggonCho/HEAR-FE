import {useState} from 'react';
import Image from "@components/common/Image";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "../../instruction.style.ts";
import {vacuumInstruction} from "@constants/instruction/vacuumInstruction.ts";
import mould from "@assets/instruction_images/vacuum/vacuum_mould.jpg";
import mould2 from "@assets/instruction_images/vacuum/vacuum_mould2.jpg";


const Preparation = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);

    const {lang} = useThemeStore();

    const images = [mould, mould2];

    return (
        <Container>
            <section>
                <p>{vacuumInstruction.preparation.mold[lang]}</p>
                <span>{vacuumInstruction.preparation.moldDescription[lang]}</span>
                <span>{vacuumInstruction.preparation.heightLimit[lang]}</span>
                <Image images={images} targetIndex={0} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
                <Image images={images} targetIndex={1} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
            </section>
        </Container>
    );
};

export default Preparation;