import {FC} from 'react';

import {useThemeStore} from "@store/useThemeStore.ts";
import {vacuumInstruction} from "@constants/instruction/vacuumInstruction.ts";

import {Container, ImageWrapper} from "../../instruction.style.ts";

import controllers from "@assets/instruction_images/vacuum/vacuum_controllers.jpg";
import on from "@assets/instruction_images/vacuum/vacuum_on.jpg";
import heat from "@assets/instruction_images/vacuum/vacuum_heat.jpg";
import mould from "@assets/instruction_images/vacuum/vacuum_mould.jpg";
import leverUp from "@assets/instruction_images/vacuum/vacuum_lever_up.jpg";
import modelDown from "@assets/instruction_images/vacuum/vacuum_model_down.jpg";
import material from "@assets/instruction_images/vacuum/vacuum_material.jpg";
import fit from "@assets/instruction_images/vacuum/vacuum_fit.jpg";
import pullHeat from "@assets/instruction_images/vacuum/vacuum_pull_heat.jpg";
import timer from "@assets/instruction_images/vacuum/vacuum_timer.jpg";
import pushHeat from "@assets/instruction_images/vacuum/vacuum_push_heat.jpg";
import vacuumPump from "@assets/instruction_images/vacuum/vacuum_pump.jpg";
import pushLever from "@assets/instruction_images/vacuum/vacuum_push_lever.jpg";
import pressure from "@assets/instruction_images/vacuum/vacuum_pressure.jpg";
import mouldUp from "@assets/instruction_images/vacuum/vacuum_mould_up.jpg";
import remove from "@assets/instruction_images/vacuum/vacuum_remove.jpg";
import finish from "@assets/instruction_images/vacuum/vacuum_finish.jpg";

const Usage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <section>
                <p>{vacuumInstruction.usage.controllers[lang]}</p>
                <span>① {vacuumInstruction.usage.power[lang]}</span>
                <span>② Vacuum pump</span>
                <span>③ {vacuumInstruction.usage.heat[lang]}</span>
                <span>④ {vacuumInstruction.usage.pressure[lang]}</span>
                <span>⑤ {vacuumInstruction.usage.timer[lang]}</span>
                <ImageWrapper>
                    <img src={controllers} alt="조작부 설명"/>
                </ImageWrapper>

                <p>{vacuumInstruction.usage.on[lang]}</p>
                <ImageWrapper>
                    <img src={on} alt="전원 켜기"/>
                </ImageWrapper>

                <p>{vacuumInstruction.usage.onHeating[lang]}</p>
                <ImageWrapper>
                    <img src={heat} alt="가열판 켜기"/>
                </ImageWrapper>

                <p>{vacuumInstruction.usage.putMold[lang]}</p>
                <ImageWrapper>
                    <img src={mould} alt="거푸집 놓기"/>
                </ImageWrapper>

                <p>{vacuumInstruction.usage.liftLever[lang]}</p>
                <ImageWrapper>
                    <img src={leverUp} alt="레버 올리기"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={modelDown} alt="거푸집이 내려감"/>
                </ImageWrapper>

                <p>{vacuumInstruction.usage.placeMaterial[lang]}</p>
                <ImageWrapper>
                    <img src={material} alt="재료 놓기"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={fit} alt="고정시키기"/>
                </ImageWrapper>

                <p>{vacuumInstruction.usage.positionHeatingPlate[lang]}</p>
                <ImageWrapper>
                    <img src={pullHeat} alt="가열판 위치시키기"/>
                </ImageWrapper>

                <p>{vacuumInstruction.usage.settingTimer[lang]}</p>
                <ImageWrapper>
                    <img src={timer} alt="타이머 시간 설정"/>
                </ImageWrapper>

                <p>{vacuumInstruction.usage.onVacuumPump[lang]}</p>
                <ImageWrapper>
                    <img src={pushHeat} alt="가열판 밀기"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={vacuumPump} alt="펌프 작동"/>
                </ImageWrapper>

                <p>{vacuumInstruction.usage.pushLever[lang]}</p>
                <ImageWrapper>
                    <img src={pushLever} alt="레버 누르기"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={mouldUp} alt="거푸집 올리기"/>
                </ImageWrapper>

                <p>{vacuumInstruction.usage.pushPressureButton[lang]}</p>
                <ImageWrapper>
                    <img src={pressure} alt="양음압 조절기 누르기"/>
                </ImageWrapper>

                <p>{vacuumInstruction.usage.downMold[lang]}</p>
                <ImageWrapper>
                    <img src={leverUp} alt="레버 올리기"/>
                </ImageWrapper>

                <p>{vacuumInstruction.usage.complete[lang]}</p>
                <ImageWrapper>
                    <img src={remove} alt="고정 핀 제거"/>
                </ImageWrapper>

                <ImageWrapper>
                    <img src={finish} alt="완료"/>
                </ImageWrapper>

                <p>{vacuumInstruction.usage.turnOff[lang]}</p>
            </section>
        </Container>
    );
};

export default Usage;