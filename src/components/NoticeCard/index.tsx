import {FC} from "react";
import {Container, More, Notice} from "./style.ts";
import {ReactSVG} from "react-svg";
import arrowForward from "../../assets/icons/arrow_forward.svg";
import description from "../../assets/icons/description.svg";

const NoticeCard:FC = () => {
    return (
        <Container>
            <div>
                <div>
                    <ReactSVG src={description}/>
                    <h3>공지사항</h3>
                </div>
                <More to={"/notice"}>
                    <ReactSVG src={arrowForward}/>
                </More>
            </div>

            <div>
                <Notice to={"/notice/1"}>
                    <span>모형제작실 교육 안내</span>
                    <span>2024.07.30</span>
                </Notice>
                <Notice to={"/notice/1"}>
                    <span>이용 후, 모형제작실 청소 주의</span>
                    <span>2024.07.30</span>
                </Notice>
                <Notice to={"/notice/1"}>
                    <span>시험기간 이용안내</span>
                    <span>2024.07.30</span>
                </Notice>
            </div>
        </Container>
    );
};

export default NoticeCard;