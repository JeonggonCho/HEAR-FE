import {FC} from "react";
import {ReactSVG} from "react-svg";

import {IRoomMapProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {machineName} from "@constants/machineCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";

import {CncWrapper, Container, LaserWrapper, MapWrapper, PrinterWrapper, VacuumWrapper} from "./style.ts";

import close from "@assets/icons/close.svg";


const RoomMap:FC<IRoomMapProps> = ({machine, setModal}) => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <h3>{cardCategories.mapTitle[lang]}</h3>

                <div onClick={(e) => {
                    e.stopPropagation();
                    setModal(false)
                }}>
                    <ReactSVG src={close}/>
                </div>
            </div>

            <MapWrapper>
                <div>
                    <div/>
                    <CncWrapper machine={machine}>CNC</CncWrapper>
                    <div/>
                </div>

                <div>
                    <div>
                        <LaserWrapper machine={machine}>
                            {machineName.laser[lang]} 2호기
                        </LaserWrapper>
                        <LaserWrapper machine={machine}>
                            {machineName.laser[lang]} 1호기
                        </LaserWrapper>
                    </div>
                    <div>
                        ▴<br/>
                        입구
                    </div>
                    <div>
                        <PrinterWrapper machine={machine}>
                            {machineName.printer[lang]} 1호기
                        </PrinterWrapper>
                        <PrinterWrapper machine={machine}>
                            {machineName.printer[lang]} 2호기
                        </PrinterWrapper>
                        <PrinterWrapper machine={machine}>
                            {machineName.printer[lang]} 3호기
                        </PrinterWrapper>
                        <VacuumWrapper machine={machine}>
                            {machineName.vacuum[lang]}
                        </VacuumWrapper>
                    </div>
                </div>
            </MapWrapper>
        </Container>
    );
};

export default RoomMap;