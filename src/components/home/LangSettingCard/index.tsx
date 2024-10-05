import {FC} from 'react';

import ArrowForward from "@components/common/ArrowForward";

import {ILangSettingCardProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {langCategories} from "@constants/themeCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";

import {Container} from "./style.ts";

const LangSettingCard:FC<ILangSettingCardProps> = ({setModal}) => {
    const {lang} = useThemeStore()

    return (
        <Container onClick={() => setModal(true)}>
            <div>
                <h3>{buttonCategories.languageSetting[lang]}</h3>
                {lang !== "en" && <span>Language</span>}
            </div>
            <div>
                <h4>{langCategories[lang]}</h4>
                <ArrowForward/>
            </div>
        </Container>
    );
};

export default LangSettingCard;