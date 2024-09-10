import {FC} from "react";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import off from "@assets/instruction_images/printer/3d_printer_off.jpg";
import clean from "@assets/instruction_images/printer/3d_printer_clean.jpg";

const After:FC = () => {
    return (
        <Container>
            <h3>3D 프린터 사용 이후</h3>

            <section>
                <p>1. 전원 끄기</p>
                <ImageWrapper>
                    <img src={off} alt="전원 끄기"/>
                </ImageWrapper>

                <p>2. 청소 및 정리하기</p>
                <span>* 청소 미실시 후, 적발 시 경고 1회</span>
                <ImageWrapper>
                    <img src={clean} alt="청소"/>
                </ImageWrapper>
            </section>
        </Container>
    );
};

export default After;