import {FC} from "react";
import {CncWrapper, Container, LaserWrapper, PrinterWrapper, VacuumWrapper} from "./style.ts";

interface IRoomMapProps {
    machine : "cnc" | "laser" | "printer" | "vacuum";
}

const RoomMap:FC<IRoomMapProps> = ({machine}) => {
    return (
        <Container>
            <p>모형제작실 실내도</p>

            <div>
                <div/>
                <CncWrapper machine={machine}>CNC</CncWrapper>
                <div/>
            </div>

            <div>
                <div>
                    <LaserWrapper machine={machine}>
                        레이저<br/>
                        커팅기<br/>
                        2호기
                    </LaserWrapper>
                    <LaserWrapper machine={machine}>
                        레이저<br/>
                        커팅기<br/>
                        1호기
                    </LaserWrapper>
                </div>
                <div>
                    입구
                </div>
                <div>
                    <PrinterWrapper machine={machine}>
                        3D 프린터<br/>
                        1호기
                    </PrinterWrapper>
                    <PrinterWrapper machine={machine}>
                        3D 프린터<br/>
                        2호기
                    </PrinterWrapper>
                    <VacuumWrapper machine={machine}>
                        사출<br/>
                        성형기
                    </VacuumWrapper>
                </div>
            </div>
        </Container>
    );
};

export default RoomMap;