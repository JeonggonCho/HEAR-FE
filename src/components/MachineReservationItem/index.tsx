import {FC} from "react";
import {Container, MachineImgWrapper} from "./style.ts";
import {IMachineSelectorProps} from "@/types/componentProps.ts";

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