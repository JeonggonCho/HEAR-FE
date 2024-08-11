import {FC} from "react";
import {Container} from "../../instruction.style.ts";

const After:FC = () => {
    return (
        <Container>
            <h3>레이저 커팅기 사용 이후</h3>

            <section>
                <p>1. 전원 끄기</p>
                <p>2. 개인이 사용하고 남은 재료 및 실내 청소하기</p>
                <p>3. 환풍기(FAN) 끄고 퇴실하기</p>
                <span>* 미실시 후, 적발 시 경고 1회</span>
            </section>
        </Container>
    );
};

export default After;