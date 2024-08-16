import {FC} from 'react';
import {Container, ImageWrapper} from "../../instruction.style.ts";
import mould from "../../../../assets/instruction_images/vacuum/vacuum_mould.jpg";
import mould2 from "../../../../assets/instruction_images/vacuum/vacuum_mould2.jpg";

const Preparation:FC = () => {
    return (
        <Container>
            <section>
                <p>거푸집</p>
                <span>찍어낼 거푸집 틀이 필요하며, 3D 프린팅을 이용하여 거푸집 모형을 만들 수 있음</span>
                <span>* 거푸집의 최대 높이는 약 15cm</span>
                <ImageWrapper>
                    <img src={mould} alt="거푸집"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={mould2} alt="거푸집"/>
                </ImageWrapper>
            </section>
        </Container>
    );
};

export default Preparation;