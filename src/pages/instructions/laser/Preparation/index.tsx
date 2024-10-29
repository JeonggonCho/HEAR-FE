import {FC} from "react";

import {useThemeStore} from "@store/useThemeStore.ts";
import {laserInstruction} from "@constants/instruction/laserInstruction.ts";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import cadLine from "@assets/instruction_images/laser/cad_line.jpg";
import cadLayer from "@assets/instruction_images/laser/cad_layer.jpeg";
import cadDxf from "@assets/instruction_images/laser/cad_dxf.jpeg";
import rhinoLine from "@assets/instruction_images/laser/rhino_line.jpeg";
import rhinoLayer from "@assets/instruction_images/laser/rhino_layer.jpeg";
import rhinoDxf from "@assets/instruction_images/laser/rhino_dxf.jpeg";


const Preparation:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <h3>{laserInstruction.preparation.usageCad[lang]}</h3>

            <section>
                <p>{laserInstruction.preparation.cadWork[lang]}</p>
                <span>{laserInstruction.preparation.origin[lang]}</span>
                <ImageWrapper>
                    <img src={cadLine} alt="캐드 선"/>
                </ImageWrapper>

                <p>{laserInstruction.preparation.cadLayer[lang]}</p>
                <ImageWrapper>
                    <img src={cadLayer} alt="캐드 레이어"/>
                </ImageWrapper>

                <p>{laserInstruction.preparation.cadSave[lang]}</p>
                <ImageWrapper>
                    <img src={cadDxf} alt="캐드 내보내기"/>
                </ImageWrapper>
            </section>

            <h3>{laserInstruction.preparation.usageRhino[lang]}</h3>

            <section>
                <p>{laserInstruction.preparation.rhinoWork[lang]}</p>
                <span>{laserInstruction.preparation.origin[lang]}</span>
                <ImageWrapper>
                    <img src={rhinoLine} alt="라이노 선"/>
                </ImageWrapper>

                <p>{laserInstruction.preparation.rhinoLayer[lang]}</p>
                <ImageWrapper>
                    <img src={rhinoLayer} alt="라이노 레이어"/>
                </ImageWrapper>

                <p>{laserInstruction.preparation.rhinoSave[lang]}</p>
                <ImageWrapper>
                    <img src={rhinoDxf} alt="라이노 내보내기"/>
                </ImageWrapper>
            </section>
        </Container>
    );
};

export default Preparation;