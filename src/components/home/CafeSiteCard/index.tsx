import {useEffect, useState} from "react";
import ArrowForward from "@components/common/ArrowForward";
import CardLoading from "@components/skeleton/CardLoading";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
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
            <div>
                <img src={cafeLogo} alt={"불꽃건축 로고"}/>
                <h3>{cardCategories.cafe[lang]}</h3>
            </div>

            <div>
                {buttonCategories.move[lang]} <ArrowForward/>
            </div>
        </Container>
    );
};

export default CafeSiteCard;