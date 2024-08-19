import {FC} from 'react';
import {IMachineSelectorProps} from "@/types/componentProps.ts";
import {Container, MachineImgWrapper} from "./style.ts";
import {ReactSVG} from "react-svg";
import arrowForward from "@assets/icons/arrow_forward.svg";

const MachineInstructionItem:FC<IMachineSelectorProps> = ({image, name, to}) => {
    return (
        <Container to={to}>
            <div>
                <MachineImgWrapper>
                    <img src={image} alt="기기 아이콘"/>
                </MachineImgWrapper>
                <h4>{name}</h4>
            </div>

            <ReactSVG src={arrowForward}/>
        </Container>
    );
};

export default MachineInstructionItem;