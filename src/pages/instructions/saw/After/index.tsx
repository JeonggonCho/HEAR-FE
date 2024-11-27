import {useState} from "react";
import Image from "@components/common/Image";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "../../instruction.style.ts";
import {sawInstruction} from "@constants/instruction/sawInstruction.ts";
import cover from "@assets/instruction_images/saw/saw_cover.jpg";
import push from "@assets/instruction_images/saw/saw_push.jpg";
import plug from "@assets/instruction_images/saw/saw_plug.jpg";
import cleaning from "@assets/instruction_images/saw/saw_cleaning.jpg";


const After = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);

    const {lang} = useThemeStore();

    const images = [cover, push, plug, cleaning];

    return (
        <Container>
            <h3>{sawInstruction.after.sawMachine[lang]}</h3>

            <section>
                <p>{sawInstruction.after.hideBlade[lang]}</p>
                <span>{sawInstruction.after.warning1[lang]}</span>
                <span>{sawInstruction.after.warning2[lang]}</span>
                <Image images={images} targetIndex={0} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <Image images={images} targetIndex={1} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
            </section>

            <h3>{sawInstruction.after.cleaningStudio[lang]}</h3>

            <section>
                <p>{sawInstruction.after.pullPlug[lang]}</p>
                <Image images={images} targetIndex={2} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{sawInstruction.after.cleaner[lang]}</p>
                <Image images={images} targetIndex={3} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
            </section>

            <span>{sawInstruction.after.warning3[lang]}</span>
        </Container>
    );
};

export default After;