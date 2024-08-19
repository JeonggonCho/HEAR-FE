import {FC} from "react";
import {Container, More, Notice} from "./style.ts";
import {ReactSVG} from "react-svg";
import arrowForward from "@assets/icons/arrow_forward.svg";
import notice from "@assets/images/notice.png";

const NoticeCard:FC = () => {
    return (
        <Container>
            <div>
                <div>
                    <img src={notice} alt="공지사항"/>
                    <h3>공지사항</h3>
                </div>
                <More to={"/notice"}>
                    <ReactSVG src={arrowForward}/>
                </More>
            </div>

            <div>
                <Notice to={"/notice/1"}>
                    <span>매우 중요) 모형제작실 교육 안내</span>
                    <span>2024.07.30</span>
                </Notice>
                <Notice to={"/notice/1"}>
                    <span>이용 후, 모형제작실 청소 주의 안할 경우 경고 조치</span>
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