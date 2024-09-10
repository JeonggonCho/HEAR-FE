import {FC} from "react";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import cadLine from "@assets/instruction_images/laser/cad_line.jpg";
import cadLayer from "@assets/instruction_images/laser/cad_layer.jpeg";
import cadDxf from "@assets/instruction_images/laser/cad_dxf.jpeg";
import rhinoLine from "@assets/instruction_images/laser/rhino_line.jpeg";
import rhinoLayer from "@assets/instruction_images/laser/rhino_layer.jpeg";
import rhinoDxf from "@assets/instruction_images/laser/rhino_dxf.jpeg";

const Preparation:FC = () => {
    return (
        <Container>
            <h3>1. 캐드 이용</h3>

            <section>
                <p>1-1. 캐드에서 원하는 스케일로 레이저 커팅 도면 작업하기</p>
                <span>* 도면 객체를 원점(0,0)에 가까이 위치시켜야 함</span>
                <ImageWrapper>
                    <img src={cadLine} alt="캐드 선"/>
                </ImageWrapper>

                <p>1-2. 레이저 커팅기 소프트웨어 LaserCut은 색상으로 레이어를 구분하기에 자르는 레이어(cut)와 해치, 각인 레이어(engrave)를 분리하고 레이어 색상을 다르게
                    적용하기</p>
                <ImageWrapper>
                    <img src={cadLayer} alt="캐드 레이어"/>
                </ImageWrapper>

                <p>1-3. 메뉴 → 다른이름으로 저장 → 확장자를 dxf로 선택하여 저장</p>
                <ImageWrapper>
                    <img src={cadDxf} alt="캐드 내보내기"/>
                </ImageWrapper>
            </section>

            <h3>2. 라이노 이용</h3>

            <section>
                <p>1-1. 라이노 Top 뷰에서 원하는 스케일로 레이저 커팅 도면 작업하기</p>
                <span>* 도면 객체를 원점(0,0)에 가까이 위치시켜야 함</span>
                <ImageWrapper>
                    <img src={rhinoLine} alt="라이노 선"/>
                </ImageWrapper>

                <p>1-2. 레이저 커팅기 소프트웨어 LaserCut은 색상으로 레이어를 구분하기에 자르는 레이어(cut)와 해치, 각인 레이어(engrave)를 분리하고 레이어 색상을 다르게
                    적용하기</p>
                <ImageWrapper>
                    <img src={rhinoLayer} alt="라이노 레이어"/>
                </ImageWrapper>

                <p>1-3. 객체 선택 → export → 확장자를 dxf로 선택하여 저장</p>
                <ImageWrapper>
                    <img src={rhinoDxf} alt="라이노 내보내기"/>
                </ImageWrapper>
            </section>
        </Container>
    );
};

export default Preparation;