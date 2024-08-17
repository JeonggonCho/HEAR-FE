import React, {FC} from 'react';
import {Container} from "./style.ts";
import {ReactSVG} from "react-svg";
import arrowForward from "../../assets/icons/arrow_forward.svg";

interface ILangSettingCardProps {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LangSettingCard:FC<ILangSettingCardProps> = ({setModalOpen}) => {
    return (
        <Container onClick={() => setModalOpen(true)}>
            <div>
                <h3>언어설정</h3>
                <span>Language</span>
            </div>
            <div>
                <h4>한국어</h4>
                <ReactSVG src={arrowForward}/>
            </div>
        </Container>
    );
};

export default LangSettingCard;