import {FC} from "react";
import {Container, MachineImgWrapper} from "./style.ts";

interface IMachineSelectorProps {
    image: string;
    name: string;
    to: string;
}

const MachineSelector: FC<IMachineSelectorProps> = ({image, name, to}) => {
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