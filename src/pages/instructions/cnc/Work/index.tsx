import {FC} from "react";

import {cncInstruction} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import ballEndmill from "@assets/instruction_images/cnc/cnc_ballEndmill.jpg";
import flatEndmill from "@assets/instruction_images/cnc/cnc_flatEndmill.jpg";
import cncLine from "@assets/instruction_images/cnc/cnc_line.jpg";
import cncVolume from "@assets/instruction_images/cnc/cnc_volume.jpg";

const Work:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <h3>{cncInstruction.work.endMillType[lang]}</h3>

            <section>
                <p>{cncInstruction.work.ballEndMill[lang]}</p>
                <span>{cncInstruction.work.ballEndMillFeature[lang]}</span>
                <ImageWrapper>
                    <img src={ballEndmill} alt="볼 엔드 밀"/>
                </ImageWrapper>

                <p>{cncInstruction.work.flatEndMill[lang]}</p>
                <span>{cncInstruction.work.flatEndMillFeature[lang]}</span>
                <ImageWrapper>
                    <img src={flatEndmill} alt="평 엔드 밀"/>
                </ImageWrapper>
            </section>

            <h3>{cncInstruction.work.availableWork[lang]}</h3>

            <section>
                <p>{cncInstruction.work.flatWork[lang]}</p>
                <span>{cncInstruction.work.flatWorkFeature[lang]}</span>
                <ImageWrapper>
                    <img src={cncLine} alt="판재 절단"/>
                </ImageWrapper>

                <p>{cncInstruction.work.volumeWork[lang]}</p>
                <span>{cncInstruction.work.volumeWorkFeature[lang]}</span>
                <ImageWrapper>
                    <img src={cncVolume} alt="매스 성형"/>
                </ImageWrapper>
            </section>
        </Container>
    );
};

export default Work;