import {FC} from "react";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import cover from "@assets/instruction_images/saw/saw_cover.jpg";
import push from "@assets/instruction_images/saw/saw_push.jpg";
import plug from "@assets/instruction_images/saw/saw_plug.jpg";
import cleaning from "@assets/instruction_images/saw/saw_cleaning.jpg";

const After:FC = () => {
    return (
        <Container>
            <h3>1. 기기</h3>

            <section>
                <p>1-1. 톱 미사용 시, 톱날이 노출되지 않게 하기</p>
                <span>* 모형제작실에서 운용되는 톱은 종류가 다양하며 종류에 따라 운용법이 다름</span>
                <span>* 덮개가 있는 모델은 덮개를 반드시 덮어두고, 톱날을 상하로 조절가능한 모델은 톱날을 내려놓기</span>
                <ImageWrapper>
                    <img src={cover} alt="덮개 사용"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={push} alt="톱날 내리기"/>
                </ImageWrapper>
            </section>

            <h3>2. 실 청소</h3>

            <section>
                <p>2-1. 콘센트에서 플러그 뽑기</p>
                <ImageWrapper>
                    <img src={plug} alt="플러그 뽑기"/>
                </ImageWrapper>

                <p>2-2. 청소기로 기기 주변, 책상, 바닥을 청소하고 사용한 재료 정리</p>
                <ImageWrapper>
                    <img src={cleaning} alt="청소 및 정리"/>
                </ImageWrapper>
            </section>

            <span>* 주의사항 및 정리 미준수 후 적발 시, 모형제작실 사용 금지</span>
        </Container>
    );
};

export default After;