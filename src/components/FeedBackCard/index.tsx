import {FC} from "react";
import {Container} from "./style.ts";
import ArrowForward from "@components/ArrowForward";

const FeedBackCard:FC = () => {
    return (
        <Container to={"/feedback/new"}>
            <h3>
                어플리케이션<br/>
                피드백
            </h3>

            <div>
                <ArrowForward/>
            </div>
        </Container>
    );
};

export default FeedBackCard;