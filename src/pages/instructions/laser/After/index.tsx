import {useState} from "react";
import Image from "@components/common/Image";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "../../instruction.style.ts";
import {laserInstruction} from "@constants/instruction/laserInstruction.ts";
import off from "@assets/instruction_images/laser/laser_on.jpg";
import fan from "@assets/instruction_images/laser/laser_fan.jpg";


const After = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);

    const {lang} = useThemeStore();

    const images = [off, fan];

    return (
        <Container>
            <h3>{laserInstruction.after.afterUsage[lang]}</h3>

            <section>
                <p>{laserInstruction.after.turnOff[lang]}</p>

                <Image images={images} targetIndex={0} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{laserInstruction.after.cleaning[lang]}</p>

                <br/>
                <br/>
                <br/>

                <p>{laserInstruction.after.fanOff[lang]}</p>

                <Image images={images} targetIndex={1} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <span>{laserInstruction.after.warning[lang]}</span>
            </section>
        </Container>
    );
};

export default After;