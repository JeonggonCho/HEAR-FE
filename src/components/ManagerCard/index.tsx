import {FC} from "react";
import {Container} from "./style.ts";
import manager from "@assets/images/manager.png";
import ColoredBtn from "@components/ColoredBtn";

const ManagerCard:FC = () => {
    return (
        <Container>
            <div>
                <img src={manager} alt="관리 조교"/>
                <h3>모형제작실 관리 조교</h3>
            </div>

            <div>
                <div>
                    <span>조정곤</span>
                    <span>병원건축연구실(216호)</span>
                </div>

                <ColoredBtn type={"link"} to={"/inquiry/new"} content={"문의하기"} width={"fit"} color={"third"} scale={"small"}/>
            </div>
        </Container>
    );
};

export default ManagerCard;