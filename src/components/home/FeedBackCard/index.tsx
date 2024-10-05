import {FC} from "react";

import ArrowForward from "@components/common/ArrowForward";

import {buttonLabels} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

const FeedBackCard:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container to={"/communication/feedback/new"}>
            <h3>{buttonLabels.appFeedback[lang]}</h3>

            <div>
                <ArrowForward/>
            </div>
        </Container>
    );
};

export default FeedBackCard;