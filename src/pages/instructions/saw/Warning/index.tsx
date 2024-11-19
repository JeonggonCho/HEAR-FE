import {FC, useState} from "react";

import Image from "@components/common/Image";

import {sawInstruction} from "@constants/instruction/sawInstruction.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "../../instruction.style.ts";

import safe from "@assets/instruction_images/saw/saw_safe.jpg";
import sawDirection from "@assets/instruction_images/saw/saw_direction.jpg";


const Warning:FC = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);

    const {lang} = useThemeStore();

    const images = [safe, sawDirection];


    return (
        <Container>
            <section>
                <p>{sawInstruction.warning.beforeUsing[lang]}</p>
                <span>{sawInstruction.warning.beforeUsingDescription[lang]}</span>
                <Image images={images} targetIndex={0} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
                <p>{sawInstruction.warning.checkSaw[lang]}</p>
                <Image images={images} targetIndex={1} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
            </section>
        </Container>
    );
};

export default Warning;