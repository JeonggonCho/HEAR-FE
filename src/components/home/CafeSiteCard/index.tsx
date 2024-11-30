import {useEffect, useState} from "react";
import {Card} from "@components/common/Card";
import Flex from "@components/common/Flex";
import ArrowForward from "@components/common/ArrowForward";
import CardLoading from "@components/skeleton/CardLoading";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import cafeLogo from "@assets/images/cafe_logo.png";


const CafeSiteCard = () => {
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
        <Container
            to={"https://cafe.daum.net/archihanyang"}
            target={"_blank"}
        >
            <Card padding={18} bgColor={true} borderRadius={16}>
                <Flex direction={"column"} gap={24} style={{width: "100%"}}>
                    <Card.Header>
                        <Flex direction={"row"} gap={16}>
                            <img width={12} src={cafeLogo} alt={"logo"}/>
                            <h3>{cardCategories.cafe[lang]}</h3>
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

export default CafeSiteCard;