import {FC} from "react";
import {Container} from "./style.ts";
import {ILangSettingContentProps} from "@/types/componentProps.ts";
import ColoredBtn from "@components/ColoredBtn";

const LangSettingContent:FC<ILangSettingContentProps> = ({setModal}) => {
    return (
        <Container>
            <h3>언어설정</h3>

            <div>
                <input type={"radio"} id="korean" name="language" value="korean"/>
                <label htmlFor="korean">한국어</label>

                <input type={"radio"} id="english" name="language" value="english"/>
                <label htmlFor="english">English</label>

                <input type={"radio"} id="chinese" name="language" value="chinese"/>
                <label htmlFor="chinese">中文</label>
            </div>

            <ColoredBtn
                type={"button"}
                content={"선택완료"}
                width={"full"}
                color={"approval"}
                scale={"big"}
                onClick={() => setModal(false)}
            />
        </Container>
    );
};

export default LangSettingContent;