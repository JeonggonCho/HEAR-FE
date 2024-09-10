import {FC} from "react";

import {IRoomMapProps} from "@/types/componentProps.ts";

import {CncWrapper, Container, LaserWrapper, MapWrapper, PrinterWrapper, VacuumWrapper} from "./style.ts";

const RoomMap:FC<IRoomMapProps> = ({machine}) => {
    return (
        <Container>
            <p>디지털 모형제작실(301호)</p>

            <MapWrapper>
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
                        ▴<br/>
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
            </MapWrapper>
        </Container>
    );
};

export default RoomMap;