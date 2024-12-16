import {Dispatch, SetStateAction} from "react";
import Icon from "@components/common/Icon";
import {useThemeStore} from "@store/useThemeStore.ts";
import {CncWrapper, Container, LaserWrapper, MapWrapper, PrinterWrapper, VacuumWrapper} from "./style.ts";
import {machineName} from "@constants/machineCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import close from "@assets/icons/close.svg";


interface IRoomMapProps {
    machine : "cnc" | "laser" | "printer" | "vacuum";
    setModal: Dispatch<SetStateAction<boolean>>;
}


const RoomMap = ({machine, setModal}: IRoomMapProps) => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <h3>{cardCategories.mapTitle[lang]}</h3>

                <div onClick={(e) => {
                    e.stopPropagation();
                    setModal(false)
                }}>
                    <Icon svg={close}/>
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
                        {cardCategories.entrance[lang]}
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