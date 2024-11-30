import {useEffect, useState} from "react";
import {ReactSVG} from "react-svg";
import ArrowForward from "@components/common/ArrowForward";
import CardLoading from "@components/skeleton/CardLoading";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import feedbackLogo from "@assets/icons/feedback.svg";
import {Card} from "@components/common/Card";
import Flex from "@components/common/Flex";


const FeedbackCard = () => {
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
            <Card padding={18} bgColor={true} borderRadius={16}>
                <Flex direction={"column"} gap={24} style={{width: "100%"}}>
                    <Card.Header>
                        <Flex direction={"row"} gap={16}>
                            <ReactSVG src={feedbackLogo}/>
                            <h3>{buttonCategories.appFeedback[lang]}</h3>
                        </Flex>
                    </Card.Header>

                    <Card.Footer>
                        <Flex justify={"flex-end"}>
                            <ArrowForward/>
                        </Flex>
                    </Card.Footer>
                </Flex>
            </Card>
        </Container>
    );
};

export default FeedbackCard;