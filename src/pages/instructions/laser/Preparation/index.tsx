import {useState} from "react";
import Image from "@components/common/Image";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "../../instruction.style.ts";
import {laserInstruction} from "@constants/instruction/laserInstruction.ts";
import cadLine from "@assets/instruction_images/laser/cad_line.jpg";
import cadLayer from "@assets/instruction_images/laser/cad_layer.jpeg";
import cadDxf from "@assets/instruction_images/laser/cad_dxf.jpeg";
import rhinoLine from "@assets/instruction_images/laser/rhino_line.jpeg";
import rhinoLayer from "@assets/instruction_images/laser/rhino_layer.jpeg";
import rhinoDxf from "@assets/instruction_images/laser/rhino_dxf.jpeg";


const Preparation = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);

    const images = [cadLine, cadLayer, cadDxf, rhinoLine, rhinoLayer, rhinoDxf];

    const {lang} = useThemeStore();

    return (
        <>
            <Container>
                <h3>{laserInstruction.preparation.usageCad[lang]}</h3>

                <section>
                    <p>{laserInstruction.preparation.cadWork[lang]}</p>
                    <span>{laserInstruction.preparation.origin[lang]}</span>
                    <Image
                        images={images}
                        targetIndex={0}
                        currentImage={currentImage}
                        setCurrentImage={setCurrentImage}
                    />

                    <p>{laserInstruction.preparation.cadLayer[lang]}</p>
                    <Image
                        images={images}
                        targetIndex={1}
                        currentImage={currentImage}
                        setCurrentImage={setCurrentImage}
                    />

                    <p>{laserInstruction.preparation.cadSave[lang]}</p>
                    <Image
                        images={images}
                        targetIndex={2}
                        currentImage={currentImage}
                        setCurrentImage={setCurrentImage}
                    />
                </section>

                <h3>{laserInstruction.preparation.usageRhino[lang]}</h3>

                <section>
                    <p>{laserInstruction.preparation.rhinoWork[lang]}</p>
                    <span>{laserInstruction.preparation.origin[lang]}</span>
                    <Image
                        images={images}
                        targetIndex={3}
                        currentImage={currentImage}
                        setCurrentImage={setCurrentImage}
                    />

                    <p>{laserInstruction.preparation.rhinoLayer[lang]}</p>
                    <Image
                        images={images}
                        currentImage={currentImage}
                        targetIndex={4}
                        setCurrentImage={setCurrentImage}
                    />

                    <p>{laserInstruction.preparation.rhinoSave[lang]}</p>
                    <Image
                        images={images}
                        targetIndex={5}
                        currentImage={currentImage}
                        setCurrentImage={setCurrentImage}
                    />
                </section>
            </Container>
        </>
    );
};

export default Preparation;