import {FC} from 'react';

import ArrowForward from "@components/ArrowForward";

import {IMachineSelectorProps} from "@/types/componentProps.ts";

import {Container, MachineImgWrapper} from "./style.ts";

const MachineInstructionItem:FC<IMachineSelectorProps> = ({image, name, to}) => {
    return (
        <Container to={to}>
            <div>
                <MachineImgWrapper>
                    <img src={image} alt="machine_img"/>
                </MachineImgWrapper>
                <h4>{name}</h4>
            </div>

            <ArrowForward/>
        </Container>
    );
};

export default MachineInstructionItem;