import {FC} from 'react';
import {IMachineSelectorProps} from "@/types/componentProps.ts";
import {Container, MachineImgWrapper} from "./style.ts";
import ArrowForward from "@components/ArrowForward";

const MachineInstructionItem:FC<IMachineSelectorProps> = ({image, name, to}) => {
    return (
        <Container to={to}>
            <div>
                <MachineImgWrapper>
                    <img src={image} alt="기기 아이콘"/>
                </MachineImgWrapper>
                <h4>{name}</h4>
            </div>

            <ArrowForward/>
        </Container>
    );
};

export default MachineInstructionItem;