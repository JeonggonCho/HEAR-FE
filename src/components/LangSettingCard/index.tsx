import {FC} from 'react';
import {Container} from "./style.ts";
import {ILangSettingCardProps} from "@/types/componentProps.ts";
import ArrowForward from "@components/ArrowForward";
import {useThemeStore} from "@store/useThemeStore.ts";
import {langCategories} from "@constants/themeCategories.ts";

const LangSettingCard:FC<ILangSettingCardProps> = ({setModal}) => {
    const {lang} = useThemeStore()

    return (
        <Container onClick={() => setModal(true)}>
            <div>
                <h3>언어설정</h3>
                <span>Language</span>
            </div>
            <div>
                <h4>{langCategories[lang]}</h4>
                <ArrowForward/>
            </div>
        </Container>
    );
};

export default LangSettingCard;