import {FC} from "react";
import {Container, ImageWrapper} from "../../instruction.style.ts";
import off from "../../../../assets/instruction_images/laser/laser_on.jpg";
import fan from "../../../../assets/instruction_images/laser/laser_fan.jpg";

const After:FC = () => {
    return (
        <Container>
            <h3>레이저 커팅기 사용 이후</h3>

            <section>
                <p>1. 전원 끄기</p>

                <ImageWrapper>
                    <img src={off} alt="전원 끄기"/>
                </ImageWrapper>

                <p>2. 개인이 사용하고 남은 재료 및 실내 청소하기</p>

                <br/>
                <br/>
                <br/>

                <p>3. 환풍기(FAN) 끄고 퇴실하기</p>

                <ImageWrapper>
                    <img src={fan} alt="환풍기 끄기"/>
                </ImageWrapper>

                <span>* 미실시 후, 적발 시 경고 1회</span>
            </section>
        </Container>
    );
};

export default After;