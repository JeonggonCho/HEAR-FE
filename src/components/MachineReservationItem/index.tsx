import {FC} from "react";

import {IMachineSelectorProps} from "@/types/componentProps.ts";

import {Container, MachineImgWrapper} from "./style.ts";

const MachineReservationItem: FC<IMachineSelectorProps> = ({image, name, to}) => {
    return (
        <Container to={to}>
            <MachineImgWrapper>
                <img src={image} alt={name}/>
            </MachineImgWrapper>

            <span>{name}</span>
        </Container>
    );
};

export default MachineReservationItem;