import {FC} from "react";

import {useThemeStore} from "@store/useThemeStore.ts";
import {laserInstruction} from "@constants/instruction/laserInstruction.ts";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import off from "@assets/instruction_images/laser/laser_on.jpg";
import fan from "@assets/instruction_images/laser/laser_fan.jpg";

const After:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <h3>{laserInstruction.after.afterUsage[lang]}</h3>

            <section>
                <p>{laserInstruction.after.turnOff[lang]}</p>

                <ImageWrapper>
                    <img src={off} alt="전원 끄기"/>
                </ImageWrapper>

                <p>{laserInstruction.after.cleaning[lang]}</p>

                <br/>
                <br/>
                <br/>

                <p>{laserInstruction.after.fanOff[lang]}</p>

                <ImageWrapper>
                    <img src={fan} alt="환풍기 끄기"/>
                </ImageWrapper>

                <span>{laserInstruction.after.warning[lang]}</span>
            </section>
        </Container>
    );
};

export default After;