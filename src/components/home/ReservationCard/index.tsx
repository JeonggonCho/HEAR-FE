import {FC} from "react";

import Link from "@components/common/Link";


import {machineReservationCategories} from "@constants/machineCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {machineName} from "@constants/machineCategories.ts";
import {MachineNameType} from "@/types/machine.ts";

import {Container} from "./style.ts";

const ReservationCard:FC<{laser: boolean, printer: boolean, heat: boolean, saw: boolean, vacuum: boolean, cnc: boolean, isLoading: boolean}> = ({laser, printer, heat, saw, vacuum, cnc, isLoading}) => {
    const {lang} = useThemeStore();

    const machineStatus = {laser, printer, heat, saw, vacuum, cnc};

    return (
        <Container>
            <div>
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
            </div>
        </Container>
    );
};

export default ReservationCard;