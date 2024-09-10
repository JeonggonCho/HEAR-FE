import {FC, useState} from "react";

import ColoredBtn from "@components/ColoredBtn";

import {ILangSettingContentProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

const LangSettingContent:FC<ILangSettingContentProps> = ({setModal}) => {
    const {lang, setLang} = useThemeStore();

    const [selectedLang, setSelectedLang] = useState<"ko"|"en"|"ch">(lang);

    const handleLangChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedLang(e.target.value as "ko"|"en"|"ch");
    };

    const handleComplete = () => {
        setLang(selectedLang);
        setModal(false);
    };

    return (
        <Container>
            <div>
                <input
                    type={"radio"}
                    id="korean"
                    name="language"
                    value="ko"
                    checked={selectedLang === "ko"}
                    onChange={handleLangChange}
                />
                <label htmlFor="korean">한국어</label>

                <input
                    type={"radio"}
                    id="english"
                    name="language"
                    value="en"
                    checked={selectedLang === "en"}
                    onChange={handleLangChange}
                />
                <label htmlFor="english">English</label>

                <input
                    type={"radio"}
                    id="chinese"
                    name="language"
                    value="ch"
                    checked={selectedLang === "ch"}
                    onChange={handleLangChange}
                />
                <label htmlFor="chinese">中文</label>
            </div>

            <ColoredBtn
                type={"button"}
                content={"선택 완료"}
                width={"full"}
                color={"approval"}
                scale={"big"}
                onClick={handleComplete}
            />
        </Container>
    );
};

export default LangSettingContent;