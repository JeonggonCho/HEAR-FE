import {useEffect, useState} from "react";
import ArrowForward from "@components/common/ArrowForward";
import CardLoading from "@components/skeleton/CardLoading";
import Card from "@components/common/Card";
import Flex from "@components/common/Flex";
import {useThemeStore} from "@store/useThemeStore.ts";
import {CardTitleWrapper, Container} from "./style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import feedbackLogo from "@assets/images/thumb_up.png";


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
            <Card padding={18} borderRadius={16}>
                <Flex
                    direction={"column"}
                    justify={"space-between"}
                    style={{width: "100%", height: "100%"}}
                >
                    <Flex direction={"row"} gap={16}>
                        <img width={24} height={24} src={feedbackLogo} alt={"logo"}/>
                        <CardTitleWrapper>{buttonCategories.appFeedback[lang]}</CardTitleWrapper>
                    </Flex>

                    <Flex justify={"flex-end"}>
                        <ArrowForward/>
                    </Flex>
                </Flex>
            </Card>
        </Container>
    );
};

export default FeedbackCard;