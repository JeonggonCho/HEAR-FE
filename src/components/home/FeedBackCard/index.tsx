import {FC} from "react";

import ArrowForward from "@components/common/ArrowForward";

import {buttonCategories} from "@constants/buttonCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

const FeedBackCard:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container to={"/communication/feedback/new"}>
            <h3>{buttonCategories.appFeedback[lang]}</h3>

            <div>
                <ArrowForward/>
            </div>
        </Container>
    );
};

export default FeedBackCard;