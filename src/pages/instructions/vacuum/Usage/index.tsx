import {FC} from 'react';
import {Container, ImageWrapper} from "../../instruction.style.ts";
import controllers from "../../../../assets/instruction_images/vacuum/vacuum_controllers.jpg";
import on from "../../../../assets/instruction_images/vacuum/vacuum_on.jpg";
import heat from "../../../../assets/instruction_images/vacuum/vacuum_heat.jpg";
import mould from "../../../../assets/instruction_images/vacuum/vacuum_mould.jpg";
import leverUp from "../../../../assets/instruction_images/vacuum/vacuum_lever_up.jpg";
import modelDown from "../../../../assets/instruction_images/vacuum/vacuum_model_down.jpg";
import material from "../../../../assets/instruction_images/vacuum/vacuum_material.jpg";
import fit from "../../../../assets/instruction_images/vacuum/vacuum_fit.jpg";
import pullHeat from "../../../../assets/instruction_images/vacuum/vacuum_pull_heat.jpg";
import timer from "../../../../assets/instruction_images/vacuum/vacuum_timer.jpg";
import pushHeat from "../../../../assets/instruction_images/vacuum/vacuum_push_heat.jpg";
import vacuumPump from "../../../../assets/instruction_images/vacuum/vacuum_pump.jpg";
import pushLever from "../../../../assets/instruction_images/vacuum/vacuum_push_lever.jpg";
import pressure from "../../../../assets/instruction_images/vacuum/vacuum_pressure.jpg";
import mouldUp from "../../../../assets/instruction_images/vacuum/vacuum_mould_up.jpg";
import remove from "../../../../assets/instruction_images/vacuum/vacuum_remove.jpg";
import finish from "../../../../assets/instruction_images/vacuum/vacuum_finish.jpg";

const Usage:FC = () => {
    return (
        <Container>
            <section>
                <p>1. 사출 성형기 조작부</p>
                <span>① 전원</span>
                <span>② Vacuum pump</span>
                <span>③ 가열판 조작부</span>
                <span>④ 양/음압 조절부</span>
                <span>⑤ 타이머</span>
                <ImageWrapper>
                    <img src={controllers} alt="조작부 설명"/>
                </ImageWrapper>

                <p>2. 전원 켜기</p>
                <ImageWrapper>
                    <img src={on} alt="전원 켜기"/>
                </ImageWrapper>

                <p>3. 가열판 켜기</p>
                <ImageWrapper>
                    <img src={heat} alt="가열판 켜기"/>
                </ImageWrapper>

                <p>4. 거푸집 놓기</p>
                <ImageWrapper>
                    <img src={mould} alt="거푸집 놓기"/>
                </ImageWrapper>

                <p>5. 좌측 레버를 올려 거푸집 내리기</p>
                <ImageWrapper>
                    <img src={leverUp} alt="레버 올리기"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={modelDown} alt="거푸집이 내려감"/>
                </ImageWrapper>

                <p>6. 재료 놓고, 고정시키기</p>
                <ImageWrapper>
                    <img src={material} alt="재료 놓기"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={fit} alt="고정시키기"/>
                </ImageWrapper>

                <p>7. 가열판 위치시키기</p>
                <ImageWrapper>
                    <img src={pullHeat} alt="가열판 위치시키기"/>
                </ImageWrapper>

                <p>8. 재료에 맞는 타이머 설정</p>
                <ImageWrapper>
                    <img src={timer} alt="타이머 시간 설정"/>
                </ImageWrapper>

                <p>9. 시간이 되면 가열판 밀고, Vacuum pump 작동</p>
                <ImageWrapper>
                    <img src={pushHeat} alt="가열판 밀기"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={vacuumPump} alt="펌프 작동"/>
                </ImageWrapper>

                <p>10. 좌측 레버를 당겨서 거푸집 올리기</p>
                <ImageWrapper>
                    <img src={pushLever} alt="레버 당기기"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={mouldUp} alt="거푸집 올리기"/>
                </ImageWrapper>

                <p>11. 양/음압 조절기를 2 ~ 3회 누르기</p>
                <ImageWrapper>
                    <img src={pressure} alt="양음압 조절기 누르기"/>
                </ImageWrapper>

                <p>12. 레버를 올려 거푸집 내리기</p>
                <ImageWrapper>
                    <img src={leverUp} alt="레버 올리기"/>
                </ImageWrapper>

                <p>13. 완료</p>
                <ImageWrapper>
                    <img src={remove} alt="고정 핀 제거"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={finish} alt="완료"/>
                </ImageWrapper>

                <p>14. 완료 후, 모든 조작부 버튼 및 레버는 처음으로 맞추고 기기 전원 끄기</p>
            </section>
        </Container>
    );
};

export default Usage;