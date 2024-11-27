import {useState} from "react";
import Image from "@components/common/Image";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "../../instruction.style.ts";
import {cncInstruction} from "@constants/instruction/cncInstruction.ts";
import ballEndmill from "@assets/instruction_images/cnc/cnc_ballEndmill.jpg";
import flatEndmill from "@assets/instruction_images/cnc/cnc_flatEndmill.jpg";
import cncLine from "@assets/instruction_images/cnc/cnc_line.jpg";
import cncVolume from "@assets/instruction_images/cnc/cnc_volume.jpg";


const Work = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);

    const {lang} = useThemeStore();

    const images = [ballEndmill, flatEndmill, cncLine, cncVolume];


    return (
        <Container>
            <h3>{cncInstruction.work.endMillType[lang]}</h3>

            <section>
                <p>{cncInstruction.work.ballEndMill[lang]}</p>
                <span>{cncInstruction.work.ballEndMillFeature[lang]}</span>
                <Image
                    images={images}
                    targetIndex={0}
                    currentImage={currentImage}
                    setCurrentImage={setCurrentImage}
                />

                <p>{cncInstruction.work.flatEndMill[lang]}</p>
                <span>{cncInstruction.work.flatEndMillFeature[lang]}</span>
                <Image
                    images={images}
                    targetIndex={1}
                    currentImage={currentImage}
                    setCurrentImage={setCurrentImage}
                />
            </section>

            <h3>{cncInstruction.work.availableWork[lang]}</h3>

            <section>
                <p>{cncInstruction.work.flatWork[lang]}</p>
                <span>{cncInstruction.work.flatWorkFeature[lang]}</span>
                <Image
                    images={images}
                    targetIndex={2}
                    currentImage={currentImage}
                    setCurrentImage={setCurrentImage}
                />

                <p>{cncInstruction.work.volumeWork[lang]}</p>
                <span>{cncInstruction.work.volumeWorkFeature[lang]}</span>
                <Image
                    images={images}
                    targetIndex={3}
                    currentImage={currentImage}
                    setCurrentImage={setCurrentImage}
                />
            </section>
        </Container>
    );
};

export default Work;