import {useEffect, useState} from "react";
import Card from "@components/common/Card";
import Flex from "@components/common/Flex";
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
        <Container to={"https://cafe.daum.net/archihanyang"} target={"_blank"}>
            <Card padding={18} borderRadius={16}>
                <Flex
                    direction={"column"}
                    justify={"space-between"}
                    style={{width: "100%", height: "100%"}}
                >
                    <h3>{cardCategories.cafe[lang]}</h3>
                    <Flex justify={"flex-end"}>
                        <img width={24} src={cafeLogo} alt={"logo"}/>
                    </Flex>
                </Flex>
            </Card>
        </Container>
    );
};

export default CafeSiteCard;