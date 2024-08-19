import {FC} from 'react';
import {ReactSVG} from "react-svg";
import write from "@assets/icons/write.svg";
import {Container} from "./style.ts";
import {ICreateBtnProps} from "@/types/componentProps.ts";

const CreateBtn:FC<ICreateBtnProps> = ({to}) => {
    return (
        <Container to={to}>
            <ReactSVG src={write}/>
        </Container>
    );
};

export default CreateBtn;