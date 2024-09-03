import {FC} from "react";
import {ReactSVG} from "react-svg";
import {Container} from "./style.ts";
import arrowForward from "@/assets/icons/arrow_forward_small.svg"

const ArrowForward:FC = () => {
    return (
        <Container>
            <ReactSVG src={arrowForward}/>
        </Container>
    );
};

export default ArrowForward;