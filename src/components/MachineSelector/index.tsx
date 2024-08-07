import {FC} from "react";
import {Container, MachineImgWrapper} from "./style.ts";

interface MachineSelectorProps {
    image: string;
    name: string;
    to: string;
}

const MachineSelector: FC<MachineSelectorProps> = ({image, name, to}) => {
    return (
        <Container to={to}>
            <MachineImgWrapper>
                <img src={image} alt={name}/>
            </MachineImgWrapper>

            <span>{name}</span>
        </Container>
    );
};

export default MachineSelector;