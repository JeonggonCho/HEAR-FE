import {FC, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";

import ArrowForward from "@components/common/ArrowForward";
import CardLoading from "@components/skeleton/CardLoading";

import {buttonCategories} from "@constants/buttonCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

import feedbackLogo from "@assets/icons/feedback.svg";

const FeedBackCard:FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    const {lang} = useThemeStore();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return <CardLoading heightValue={"120px"}/>
    }

    return (
        <Container to={"/communication/feedback/new"}>
            <div>
                <ReactSVG src={feedbackLogo}/>
                <h3>{buttonCategories.appFeedback[lang]}</h3>
            </div>
            <div>
                <ArrowForward/>
            </div>
        </Container>
    );
};

export default FeedBackCard;