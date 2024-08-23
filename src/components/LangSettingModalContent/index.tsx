import {FC} from "react";
import {Container} from "./style.ts";
import {ReactSVG} from "react-svg";
import close from "@assets/icons/close.svg";
import check from "@assets/icons/check.svg";
import {ILangSettingModalContentProps} from "@/types/componentProps.ts";
import ColoredBtn from "@components/ColoredBtn";

const LangSettingModalContent:FC<ILangSettingModalContentProps> = ({setModal}) => {
    return (
        <Container>
            <div>
                <h3>언어설정</h3>
                <div onClick={() => setModal(false)}>
                    <ReactSVG src={close}/>
                </div>
            </div>

            <div>
                <input type={"radio"} id="korean" name="language" value="korean"/>
                <label htmlFor="korean">Korean <ReactSVG src={check}/></label>

                <input type={"radio"} id="english" name="language" value="english"/>
                <label htmlFor="english">English <ReactSVG src={check}/></label>

                <input type={"radio"} id="chinese" name="language" value="chinese"/>
                <label htmlFor="chinese">Chinese <ReactSVG src={check}/></label>
            </div>

            <ColoredBtn
                type={"button"}
                content={"선택완료"}
                width={"full"}
                color={"approval"}
                scale={"big"}
            />
        </Container>
    );
};

export default LangSettingModalContent;