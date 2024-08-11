import {FC} from "react";
import {Container} from "./style.ts";

const ManagerCard:FC = () => {
    return (
        <Container>
            <h3>모형제작실 관리 조교</h3>
            <div>
                <span>조정곤</span>
                <span>병원건축연구실 (216호)</span>
            </div>
        </Container>
    );
};

export default ManagerCard;