import Link from "@components/common/Link";
import Card from "@components/common/Card";
import {useThemeStore} from "@store/useThemeStore.ts";
import {ReservationLinksWrapper} from "./style.ts";
import {machineReservationCategories} from "@constants/machineCategories.ts";
import {machineName} from "@constants/machineCategories.ts";
import {MachineNameType} from "@/types/machine.ts";


interface IReservationCardProps {
    laser: boolean;
    printer: boolean;
    heat: boolean;
    saw: boolean;
    vacuum: boolean;
    cnc: boolean;
    isLoading: boolean;
}


const ReservationCard = ({laser, printer, heat, saw, vacuum, cnc, isLoading}: IReservationCardProps) => {
    const {lang} = useThemeStore();

    const machineStatus = {laser, printer, heat, saw, vacuum, cnc};

    return (
        <Card
            borderRadius={0}
            padding={"12px 8px 20px"}
            bgColor={"sub"}
        >
            <h3>예약하기</h3>
            <ReservationLinksWrapper>
                {machineReservationCategories.map((machine, index) => {
                    const nameKey = machine.type as keyof MachineNameType;
                    const machineNameEntry = machineName[nameKey];
                    const nameText = machineNameEntry ? machineNameEntry[lang] : undefined;

                    return (
                        <Link
                            key={index}
                            image={machine.image}
                            name={nameText || "알 수 없음"}
                            to={machine.link as string}
                            type={"button"}
                            isDisabled={!machineStatus[machine.type]}
                            isLoading={isLoading}
                        />
                    );
                })}
            </ReservationLinksWrapper>
        </Card>
    );
};

export default ReservationCard;