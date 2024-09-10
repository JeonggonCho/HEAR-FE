import {FC} from 'react';
import {ReactSVG} from "react-svg";

import {ICreateBtnProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

import write from "@assets/icons/write.svg";

const CreateBtn:FC<ICreateBtnProps> = ({to}) => {
    return (
        <Container to={to}>
            <ReactSVG src={write}/>
        </Container>
    );
};

export default CreateBtn;