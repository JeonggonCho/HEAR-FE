import {FC} from "react";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import ballEndmill from "@assets/instruction_images/cnc/cnc_ballEndmill.jpg";
import flatEndmill from "@assets/instruction_images/cnc/cnc_flatEndmill.jpg";
import cncLine from "@assets/instruction_images/cnc/cnc_line.jpg";
import cncVolume from "@assets/instruction_images/cnc/cnc_volume.jpg";

const Work:FC = () => {
    return (
        <Container>
            <h3>1. 사용되는 엔드밀 종류</h3>

            <section>
                <p>1-1. 볼 엔드 밀</p>
                <span>끝이 둥글며, 각인 사용에 권장 됨</span>
                <ImageWrapper>
                    <img src={ballEndmill} alt="볼 엔드 밀"/>
                </ImageWrapper>

                <p>1-2. 평 엔드 밀</p>
                <span>끝이 평평하며, 판재 절삭에 권장 됨</span>
                <ImageWrapper>
                    <img src={flatEndmill} alt="평 엔드 밀"/>
                </ImageWrapper>
            </section>

            <h3>2. 가능한 작업</h3>

            <section>
                <p>2-1. 2D 성형</p>
                <span>판재 절단 (선 가공)</span>
                <ImageWrapper>
                    <img src={cncLine} alt="판재 절단"/>
                </ImageWrapper>

                <p>2-2. 2.5D 성형</p>
                <span>음 / 양각 매스 성형</span>
                <ImageWrapper>
                    <img src={cncVolume} alt="매스 성형"/>
                </ImageWrapper>
            </section>
        </Container>
    );
};

export default Work;