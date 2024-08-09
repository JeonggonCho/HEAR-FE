import {FC} from "react";
import {Container} from "./style.ts";
import {ReactSVG} from "react-svg";
import arrowForward from "../../assets/icons/arrow_forward.svg";

const FeedBackCard:FC = () => {
    return (
        <Container to={"/qna/feedback"}>
            <h3>
                어플리케이션<br/>
                피드백
            </h3>

            <div>
                <ReactSVG src={arrowForward}/>
            </div>
        </Container>
    );
};

export default FeedBackCard;