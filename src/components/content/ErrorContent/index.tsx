import {FC} from "react";
import {ReactSVG} from "react-svg";

import Button from "@components/common/Button";

import {IErrorContentProps} from "@/types/componentProps.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

import error from "@assets/icons/error.svg";

const ErrorContent:FC<IErrorContentProps> = ({text, closeModal}) => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <ReactSVG src={error}/>
            <p>{text}</p>
            <Button
                type={"button"}
                content={buttonCategories.close[lang]}
                width={"full"}
                color={"danger"}
                scale={"normal"}
                onClick={closeModal}
            />
        </Container>
    );
};

export default ErrorContent;