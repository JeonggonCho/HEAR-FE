import {FC, useEffect, useState} from 'react';
import {ReactSVG} from "react-svg";

import ArrowForward from "@components/common/ArrowForward";
import CardLoading from "@components/skeleton/CardLoading";

import {ILangSettingCardProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";

import {Container} from "./style.ts";

import langLogo from "@assets/icons/lang.svg";

const LangSettingCard:FC<ILangSettingCardProps> = ({setModal}) => {
    const [isLoading, setIsLoading] = useState(true);

    const {lang} = useThemeStore()

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return <CardLoading heightValue={"120px"}/>
    }

    return (
        <Container onClick={() => setModal(true)}>
            <div>
                <ReactSVG src={langLogo}/>
                <h3>{buttonCategories.languageSetting[lang]}</h3>
            </div>
            <div>
                <h4>{cardCategories.currentLang[lang]}</h4>
                <ArrowForward/>
            </div>
        </Container>
    );
};

export default LangSettingCard;