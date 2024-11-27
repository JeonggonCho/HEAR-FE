import {useEffect, useState} from "react";
import {ReactSVG} from "react-svg";
import ArrowForward from "@components/common/ArrowForward";
import CardLoading from "@components/skeleton/CardLoading";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import feedbackLogo from "@assets/icons/feedback.svg";


const FeedBackCard = () => {
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
        <Container to={"/board/feedback/new"}>
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