import {FC} from "react";

import ArrowForward from "@components/ArrowForward";

import {Container} from "./style.ts";

const FeedBackCard:FC = () => {
    return (
        <Container to={"/communication/feedback/new"}>
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