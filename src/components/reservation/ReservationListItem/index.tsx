import Icon from "@components/common/Icon";
import DeleteReservation from "@components/reservation/DeleteReservation";
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
import {IReservation} from "@/types/componentProps.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {machineName} from "@constants/machineCategories.ts";
import laser from "@assets/images/laser_cut.png";
import printer from "@assets/images/3d_printer.png";
import heat from "@assets/images/heat_cutter.png";
import saw from "@assets/images/saw.png";
import vacuum from "@assets/images/vacuum.png";
import cnc from "@assets/images/cnc.png";
import check from "@assets/icons/check.svg";


interface IReservationListItemProps {
    reservation: IReservation;
    deleteHandler?: (reservations: {machine: "laser" | "printer" | "heat" | "saw" | "vacuum" | "cnc", _id: string, date: string}[]) => void;
    isSelected?: boolean;
    selectHandler?: () => void;
}


const ReservationListItem = (
    {
        reservation,
        deleteHandler,
        isSelected,
        selectHandler
    }: IReservationListItemProps
) => {
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
                {isSelected !== undefined &&
                    <>
                        <input type={"checkbox"} id={reservation._id} onChange={selectHandler} checked={isSelected}/>
                        <label htmlFor={reservation._id}>
                            <Icon svg={check}/>
                        </label>
                    </>
                }

                <div>
                    <DateText>{(new Date(reservation.date)).toLocaleDateString()}</DateText>
                    {new Date().toDateString() === new Date(reservation.date).toDateString() && <DateTag>{cardCategories.today[lang]}</DateTag>}
                </div>

                {deleteHandler !== undefined &&
                    <DeleteReservation reservation={reservation} deleteHandler={deleteHandler}/>
                }
            </div>

            <div>
                <ImgWrapper>
                    <img src={machines[reservation.machine].image} alt={"기기 이미지"}/>
                </ImgWrapper>
                <ReservationInfoWrapper>
                <MachineType>{machineName[reservation.machine][lang]}</MachineType>
                    {reservation.machineName && <MachineName>{reservation.machineName}</MachineName>}
                    {["laser", "saw", "vacuum"].includes(reservation.machine) &&
                      <TimeWrapper>
                        <span>{`${reservation.machine === "laser" ?
                            cardCategories.usageTime[lang]
                            : reservation.machine === "saw" ?
                                cardCategories.preferredTime[lang]
                                : reservation.machine === "vacuum" ?
                                    cardCategories.preferredTime[lang]
                                    : ""} | `}
                        </span>
                        <span>{`${reservation.startTime && reservation.startTime} - ${reservation.endTime && reservation.endTime}`}</span>
                      </TimeWrapper>
                    }
                </ReservationInfoWrapper>
            </div>
        </Container>
    );
};

export default ReservationListItem;