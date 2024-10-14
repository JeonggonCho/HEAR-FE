import {FC} from "react";
import {ReactSVG} from "react-svg";

import {IReservationListItemProps} from "@/types/componentProps.ts";
import {machineName} from "@constants/machineCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {
    Container, DateTag,
    DateText,
    ImgWrapper,
    MachineName,
    MachineType,
    ReservationInfoWrapper,
    TimeWrapper
} from "./style.ts";

import laser from "@assets/images/laser_cut.png";
import printer from "@assets/images/3d_printer.png";
import heat from "@assets/images/heat_cutter.png";
import saw from "@assets/images/saw.png";
import vacuum from "@assets/images/vacuum.png";
import cnc from "@assets/images/cnc.png";
import close from "@assets/icons/close.svg";
import check from "@assets/icons/check.svg";

const ReservationListItem:FC<IReservationListItemProps> = ({reservation}) => {
    const {lang} = useThemeStore();

    const machines = {
        laser: {image: laser, machine: machineName.laser[lang]},
        printer: {image: printer, machine: machineName.printer[lang]},
        heat: {image: heat, machine: machineName.heat[lang]},
        saw: {image: saw, machine: machineName.saw[lang]},
        vacuum: {image: vacuum, machine: machineName.vacuum[lang]},
        cnc: {image: cnc, machine: machineName.cnc[lang]},
    };

    return (
        <Container>
            <div>
                <input type={"checkbox"} id={reservation._id}/>
                <label htmlFor={reservation._id}>
                    <ReactSVG src={check}/>
                </label>
                <div>
                    <DateText>{reservation.date.split("-").join(".")}</DateText>
                    <DateTag>오늘</DateTag>
                </div>
                <div>
                    <ReactSVG src={close}/>
                </div>
            </div>

            <div>
                <ImgWrapper>
                    <img src={machines[reservation.machine].image} alt={"기기 이미지"}/>
                </ImgWrapper>
                <ReservationInfoWrapper>
                <MachineType>{machineName[reservation.machine][lang]}</MachineType>
                    {reservation.machineName && <MachineName>{reservation.machineName}</MachineName>}
                    <TimeWrapper>
                        이용 시간 | {reservation.startTime && <span>{reservation.startTime}</span>} - {reservation.endTime && <span>{reservation.endTime}</span>}
                    </TimeWrapper>
                </ReservationInfoWrapper>
            </div>
        </Container>
    );
};

export default ReservationListItem;